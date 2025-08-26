// Extend Express Request interface
declare namespace Express {
  interface Request {
    requestTime?: number;
    user?: {
      id: string;
      email: string;
      name: string;
    };
  }
}
