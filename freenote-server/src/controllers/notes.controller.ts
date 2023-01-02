import { Router, Handler, Request, Response } from "express";
import { encrypt } from "../lib/encryption";
import { User } from "../models/User";
import { body, param } from "express-validator";
import { validate } from "../lib/middleware/validate";
import { auth } from "../lib/middleware/auth";
import { catchAsync } from "../lib/utils";
import { Note } from "../models/Note";
import { APIError } from "../lib/APIError";

export const notesController = {
  getRouter() {
    const router = Router();
    router.post(
      "/",
      [
        body("title").isString(),
        body("content").isString(),
        validate(),
        auth({ fetchUser: true }),
      ],
      catchAsync(this.createNote)
    );
    router.get("/", auth({ fetchUser: true }), catchAsync(this.getAllNotes));
    router.get(
      "/:id",
      [param("id").isNumeric(), validate(), auth({ fetchUser: true })],
      catchAsync(this.getOneNote)
    );
    router.patch(
      "/:id",
      [
        param("id").isNumeric(),
        body("title").isString().optional(),
        body("content").isString().optional(),
        validate(),
        auth({ fetchUser: true }),
      ],
      catchAsync(this.updateNote)
    );
    router.delete(
      "/:id",
      [param("id").isNumeric(), validate(), auth({ fetchUser: true })],
      catchAsync(this.deleteNote)
    );
    return router;
  },

  async createNote(req: Request, res: Response) {
    const { title, content } = req.body;
    const { passwordKey } = req.userToken!;
    const user = req.user!;
    const userKey = await user.getUserKey(passwordKey);
    const note = await Note.create({
      title,
      content,
      userId: user.id,
      initVector: user.init_vector,
      userKey,
    });
    return res.json({
      data: note.toDecRespDto(userKey, user.init_vector),
      meta: {
        message: "note creted successfully",
      },
    });
  },

  async getAllNotes(req: Request, res: Response) {
    const { passwordKey } = req.userToken!;
    const user = req.user!;
    const userKey = await user.getUserKey(passwordKey);
    const notes = await user
      .$relatedQuery("notes")
      .where({ is_deleted: false });
    const notesResp = notes.map((note) =>
      note.toDecRespDto(userKey, user.init_vector)
    );
    return res.json({
      data: notesResp,
    });
  },

  async getOneNote(req: Request, res: Response) {
    const { id } = req.params;
    const user = req.user!;
    const note = await Note.query().findOne({ id, is_deleted: false });
    if (!note || user.id !== note.user_id) {
      throw APIError.notFound("note not found");
    }
    const { passwordKey } = req.userToken!;
    const userKey = await user.getUserKey(passwordKey);
    return res.json({
      data: note.toDecRespDto(userKey, user.init_vector),
    });
  },

  async updateNote(req: Request, res: Response) {
    const { title, content } = req.body;
    const { id } = req.params;
    const user = req.user!;
    const note = await Note.query().findOne({ id, is_deleted: false });
    if (!note || user.id !== note.user_id) {
      throw APIError.notFound("note not found");
    }
    const { passwordKey } = req.userToken!;
    const userKey = await user.getUserKey(passwordKey);
    const details: Partial<Note> = {};
    if (title !== undefined) {
      details.title = encrypt(title, userKey, user.init_vector);
    }
    if (content !== undefined) {
      details.content = encrypt(content, userKey, user.init_vector);
    }
    const upNote = await note.$query().updateAndFetch(details);
    return res.json({
      data: upNote.toDecRespDto(userKey, user.init_vector),
    });
  },

  async deleteNote(req: Request, res: Response) {
    const { id } = req.params;
    const { id: userId } = req.userToken!;
    const note = await Note.query().findOne({ id, is_deleted: false });
    if (!note || note.user_id !== userId) {
      throw APIError.notFound("note not found");
    }
    await note.softDelete();
    res.json({
      meta: {
        message: "note deleted successfully",
      },
    });
  },
};

notesController.getRouter.bind(notesController);
