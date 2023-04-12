import * as express from "express"
import * as bodyParser from "body-parser"
import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"

AppDataSource.initialize().then(async () => {

  // create express app
  const app = express();
  const port = 3001;
  app.use(bodyParser.json());

  // register express routes from defined application routes
  Routes.forEach(route => {
    app[route.method](route.route, async (req: Request, res: Response, next: NextFunction) => {
      const result = await route.action(req, res, next);
      if (result instanceof Promise) {
        result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

      } else if (result !== null && result !== undefined) {
        res.json(result)
      }
    })
  });

  // setup express app here
  // ...

  // start express server
  app.listen(port);


  console.log(`Express server has started on port ${port}. Open http://localhost:3000/users to see results`);

}).catch(error => console.log(error));
