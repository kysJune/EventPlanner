import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/hello/cleveland', (req: Request, res: Response) =>{
    res.send('Hello Cleveland!')
})

app.get("/test", (req: Request, res: Response) => {
    interface test {
        name: string,
        age: number
    }

    const person: test = {
        name: "test",
        age: 22
    };

    console.log(person);
    res.send("tet again");
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
});

