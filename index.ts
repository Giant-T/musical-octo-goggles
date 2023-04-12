import express, { Request, Response } from "express";

const app = express();

const port: number = 3000;

app.get('/', (req: Request, res: Response) => {
  res.json({ test: 'surtest' });
});

app.listen(port, () => {
  console.log(`🚀 Le serveur est lancé sur http://localhost:${port} 🚀`);
});
