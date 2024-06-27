import express, { json } from 'express';
import routes from './routes';

console.log("Starting App");

const app = express();

app.use(json());
app.use('/', routes);

app.get('/', function(req, res)
{
  res.send("Server is working");
})

export default app;