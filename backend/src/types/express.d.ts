declare namespace Express {
  export interface Request {
    requestTime: number;
    user?: {
      id: string;
      email: string;
      name: string;
    };
  }
}