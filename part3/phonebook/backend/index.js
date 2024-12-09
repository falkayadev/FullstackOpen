import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const generateId = () => {
  return String(Math.round(Math.random() * 100000));
};

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ error: "Not found!" });
  }
});

app.get("/api/info", (req, res) => {
  const content = `Phonebook has info for ${
    persons.length
  } people <br/> ${new Date()}`;
  res.send(content);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const isExist = persons.some((person) => person.name === req.body.name);

  if (!body.name) {
    return res.status(400).json({ error: "Name missing" });
  }

  if (!body.number) {
    return res.status(400).json({ error: "Number missing" });
  }

  if (isExist) {
    return res.status(409).json({ error: "Name must be unique" });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons.concat(person);
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).json(person);
});

app.listen(port, () => {
  console.log(`Server is listening on ${port} port`);
});
