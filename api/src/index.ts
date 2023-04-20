import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { TemperatureController } from "./controller/TemperatureController"

AppDataSource.initialize().then(async () => {
  const app = express();
  const port = 3001;
  app.use(bodyParser.json());

  const temperatureController = new TemperatureController();

  // Routes
  app.get("/temperature/all", async (_, res: Response) => {
    const result = await temperatureController.all();
    res.json(result);
  });
  app.post("/temperature", async (req: Request, res: Response) => {
    const result = await temperatureController.insert(req);
    res.json(result);
  });

  app.listen(port);

  console.log(`Express server has started on port ${port}.`);

}).catch(error => console.log(error));
