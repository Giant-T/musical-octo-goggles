import { NextFunction, Request, Response } from "express";

interface Route {
  method: string,
  route: string,
  action: (req: Request, res: Response, next: NextFunction) => Promise<Object>;
};

export const Routes: Route[] = [];
