import { Router, Handler, Request, Response } from "express";
import { encrypt } from "../lib/encryption";
import { User } from "../models/User";
import { body, param } from 'express-validator'
import { validate } from '../lib/middleware/validate'
import { auth } from '../lib/middleware/auth'
import { catchAsync } from "../lib/utils";
import { Note } from "../models/Note";
import { APIError } from '../lib/APIError'

export const notesController = {
  getRouter() {
    const router = Router();
    router.post(
      '/',
      [
        body('title').isString(),
        body('content').isString(),
        validate(),
        auth()
      ],
      catchAsync(this.createNote)
    )
    router.get(
      '/',
      auth(),
      catchAsync(
        this.getAllNotes
      )
    )
    router.get(
      '/:id',
      [
        param('id').isNumeric(),
        validate(),
        auth(),
      ],
      catchAsync(
        this.getOneNote
      )
    )
    router.delete(
      '/:id',
      [
        param('id').isNumeric(),
        validate(),
        auth()
      ],
      catchAsync(this.deleteNote)
    )
    return router;
  },


  async createNote(req: Request, res: Response) {
    const { title, content } = req.body;
    const { id, passwordKey } = res.locals.userToken;
    const user = await User.query().findById(id);
    const userKey = await user.getUserKey(passwordKey);
    const note = await Note.create({
      title,
      content,
      userId: user.id,
      initVector: user.init_vector,
      userKey,
    })
    return res.json({
      data: note.toDecRespDto(userKey, user.init_vector),
      meta: {
        message: "note creted successfully"
      }
    })
  },

  async getAllNotes(req: Request, res: Response) {
    const { id, passwordKey } = res.locals.userToken;
    const user = await User.query().findById(id);
    const userKey = await user.getUserKey(passwordKey);
    const notes = await user.$relatedQuery('notes').where({ is_deleted: false });
    const notesResp = notes.map(note => note.toDecRespDto(userKey, user.init_vector));
    return res.json({
      data: notesResp,
    })
  },

  async getOneNote(req: Request, res: Response) {
    const { id } = req.params;
    const { userId, passwordKey } = res.locals.userToken
    const note = await Note.query().findOne({ id, is_deleted: false });
    const user = await User.query().findById(userId);
    const userKey = await user.getUserKey(passwordKey);
    if (!note) {
      throw APIError.notFound('note not found');
    }
    return res.json({
      data: note.toDecRespDto(userKey, user.init_vector),
    })
  },

  async deleteNote(req: Request, res: Response) {
    const { id } = req.params;
    const { id: userId } = res.locals.userToken;
    const note = await Note.query().findById(id);
    if (!note) {
      throw APIError.notFound('note not found');
    }
    if (note.user_id !== userId) {
      throw APIError.notFound('note not found');
    }
    await note.softDelete();
    res.json({
      meta: {
        message: "note deleted successfully"
      }
    })
  }
};

notesController.getRouter.bind(notesController);