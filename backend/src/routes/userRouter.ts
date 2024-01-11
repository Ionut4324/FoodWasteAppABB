import express from 'express';
import { createUser, deleteUser, getUserByCredentials, getUserById, getUsers } from "../dataAccess/userDA"

let userRouter = express.Router();

userRouter.route('/user').get(async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error getting users', error: error });
  }
});

userRouter.route('/user/:id').get(async (req, res) => {
  try {
    const user = await getUserById(parseInt(req.params.id));
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error getting user', error: error });
  }
});

userRouter.route('/user').post(async (req, res) => {
  try {
    const body = req.body;
    const user = await createUser({
      email: body.email,
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName
    });
    return res.status(200).json({
      message: 'User created successfully',
      user: user
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error });
  }
});

userRouter.route('/login').post(async (req, res) => {
  try {
    const body = req.body;
    const credentials = {
      email: body.email,
      password: body.password
    };
    if(!credentials.email || !credentials.password){
      return res.status(400).json({message : 'Bad request'})
    }
    console.log(credentials);
    const user = await getUserByCredentials(credentials.email, credentials.password);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error getting user', error: error });
  }
});

userRouter.route('/user/:id').delete(async (req, res) => {
  try {
    const user = await deleteUser(parseInt(req.params.id));
    if (user) {
      return res.status(200).json({ message: 'User deleted successfully' });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting user', error: error });
  }
});

export default userRouter;