import jwt from 'jsonwebtoken';
import faker from 'faker';

export const expiredToken = `Bearer ${jwt.sign({ id: 1 }, process.env.JWT_SECRET_KEY, {
  expiresIn: 1,
})}`;
export const invalidToken = `Bearer ${jwt.sign({}, process.env.JWT_SECRET_KEY, {
  expiresIn: 86400,
})}`;
export const wrongSecretToken = `Bearer ${jwt.sign({ id: 1 }, 'fakesecret', {
  expiresIn: 86400,
})}`;

export const admin = {
  email: 'admin@gmail.com',
  password: 'Password@1234',
};

export const user = {
  name: faker.internet.userName(),
  status: faker.datatype.boolean(),
  groups: ['Admin', 'User'],
  features: ['Add', 'Update'],
};

export const userWithMissingField = {
  status: faker.datatype.boolean(),
  features: ['Create', 'Delete'],
  groups: ['Admin', 'User'],
};
