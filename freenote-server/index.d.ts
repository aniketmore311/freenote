import { User } from "./src/models/User";
import { IUserToken } from "./src/models/User";

declare module "express-serve-static-core" {
  interface Request {
    userToken?: IUserToken;
    user?: User
  }

}