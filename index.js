const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

function checkProjectExist(req, res, next) {
  if (req.params.id >= projects.length) {
    return res.status(400).json({ error: "This ID doesn't exist" });
  }
  return next();
}

var count = 0;
function countReq(req, res, next) {
  count++;

  console.log(count);
  next();
}

server.post("/projects", countReq, (req, res) => {
  const { id } = req.body;
  const { title } = req.body;

  projects.push({ id: id, title: title, tasks: [] });
  return res.json(projects);
});

server.get("/projects", countReq, (req, res) => {
  return res.json(projects);
});

server.get("/projects/:id", checkProjectExist, countReq, (req, res) => {
  const { id } = req.params;
  return res.json(projects[id]);
});

server.delete("/projects/:id", checkProjectExist, countReq, (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);
  return res.json(projects);
});

server.post("/projects/:id/tasks", checkProjectExist, countReq, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[id].tasks.push(title);
  return res.json(projects);
});

server.listen(3000);
