import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import { trajectsRouter } from "./routes/trajects";
import { stationsRouter } from "./routes/stations";
import { rollingStockRouter } from "./routes/rollingStock";

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.send("SRCA and SR&CA management tools");
});

app.use("/trajects", trajectsRouter);
app.use("/stations", stationsRouter);
app.use("/rolling-stock", rollingStockRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
