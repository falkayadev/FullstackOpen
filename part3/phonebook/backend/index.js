import express from "express";
import morgan from "morgan";
import cors from "cors";
import Person from "./models/person.js";

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
// app.use(express.static("dist"));
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const generateId = () => {
  return String(Math.round(Math.random() * 100000));
};

app.get("/api/people", (req, res) => {
  Person.find({}).then((people) => {
    res.json(people);
  });
});

app.get("/api/people/:id", (req, res) => {
  Person.findById(req.params.id).then((person) => {
    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ error: "Not found!" });
    }
  });
});

app.get("/api/info", (req, res) => {
  const content = `Phonebook has info for ${
    people.length
  } people <br/> ${new Date()}`;
  res.send(content);
});

app.post("/api/people", (req, res) => {
  // const isExist = people.some((person) => person.name === req.body.name);
  const person = new Person({
    name: req.body.name,
    number: req.body.number,
  });

  if (req.body.name && req.body.number) {
    person.save().then((result) => {
      res.json(person);
    });
  }

  // if (isExist) {
  //   return res.status(409).json({ error: "Name must be unique" });
  // }
});

app.delete("/api/people/:id", (req, res) => {
  const id = req.params.id;
  const person = people.find((person) => person.id === id);
  people = people.filter((person) => person.id !== id);
  res.status(204).json(person);
});

app.listen(port, () => {
  console.log(`Server is listening on ${port} port`);
});
