// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Express } from 'express-serve-static-core';

global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  declare namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        iat: string;
        exp: string;
      };
      project_id?: string;
    }
  }
}
