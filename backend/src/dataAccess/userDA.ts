import Product from "../entities/Product";
import User, { UserCreationAttributes } from "../entities/User";
import { Products } from "../entities/dbConst";

async function createUser(user: UserCreationAttributes) {
  return await User.create(user, {
    include: [{
      model: Product,
      as: "Products"
    }]
  });
}

async function getUserById(id: number) {
  const user = await User.findByPk(id, {
    include: [{
      model: Product,
      as: "Products"
    }]
  });
  return user;
}

async function getUserByCredentials(email: string, password: string) {
  const user = await User.findOne({
    where: {
      email: email,
      password: password
    },
    include: [{
      model: Product,
      as: "Products"
    }]
  });
  return user;
}

async function getUsers() {
  const users = await User.findAll({ include: [{
    model: Product,
    as: "Products"
  }] });
  return users;
}

async function deleteUser(id: number) {
  let user = await User.findByPk(id);

  if (user === null) {
    return false;
  }
  await user.destroy();
  return true;
}

export {
  createUser,
  getUserByCredentials,
  getUsers,
  getUserById,
  deleteUser
}
