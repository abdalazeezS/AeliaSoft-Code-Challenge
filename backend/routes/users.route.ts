import { Router } from "express"

const router = Router();
const users = [
  {
    "id": 1,
    "name": "Ahmad",
    "age": 22,
  },
  {
    "id": 2,
    "name": "Rami",
    "age": 19,
  },
  {
    "id": 3,
    "name": "Ali",
    "age": 25,
  },
];

router.get('/', (req, res) => {
  res.status(200).send(users);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (user) {
    res.status(200).send(user);
  }
  else {
    res.status(404).send("user not found");
  }

});

router.post('/', (req, res) => {
  const user = req.body;
  if (!user || !user.id || !user.name || !user.age) {
    res.status(400).send("user object is not correct").end();
  } else {
    users.push(user);
    res.status(201).send("user added successfully").end();
  }
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const updatedUser = req.body;

  if (Object.keys(updatedUser).length == 0) {
    res.status(400).send("user object is not correct");
  }
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    res.status(404).send("user not found");
  } else {
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    res.status(200).send(users[userIndex]);
  }
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);

  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    res.status(404).send("user not found");
  } else {
    users.splice(userIndex, 1);
    res.status(200).send("deleted successfully");
  }
});

export default router;