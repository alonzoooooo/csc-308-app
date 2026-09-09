import express from "express";
import cors from "cors";
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspiring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};
const findUserByName = (name) => {
  return users.users_list.filter((user) => {
    return user.name === name;
  });
};

const generateId = () => {
  return Math.random().toString(36).substring(2, 8);
};

const findUserById = (id) => {
  return users.users_list.find((user) => {
    return user.id === id;
  });
};

const findUsersByNameAndJob = (name, job) => {
  return users.users_list.filter((user) => {
    return user.name === name && user.job === job;
  });
};

const addUser = (user) => {
  const newUser = {
    ...user,
    id: generateId(),
  };

  users.users_list.push(newUser);
  return newUser;
};
const deleteUserById = (id) => {
  const index = users.users_list.findIndex((user) => {
    return user.id === id;
  });

  if (index === -1) {
    return false;
  }

  users.users_list.splice(index, 1);
  return true;
};
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name !== undefined && job !== undefined) {
    const result = findUsersByNameAndJob(name, job);
    res.send({ users_list: result });
  } else if (name !== undefined) {
    const result = findUserByName(name);
    res.send({ users_list: result });
  } else {
    res.send(users);
  }
});
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const result = findUserById(id);

  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const newUser = addUser(userToAdd);
  res.status(201).send(newUser);
});
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const wasDeleted = deleteUserById(id);

  if (wasDeleted) {
    res.status(204).send();
  } else {
    res.status(404).send("Resource not found.");
  }
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
