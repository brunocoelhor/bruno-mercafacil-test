import { hash } from 'bcryptjs';

import { prismaPg } from '../../../database/prismaClient';

interface IUserRequest {
  name: string;
  username: string;
  password: string;
}

export class CreateUserUseCase {

    async execute({ name, username, password }: IUserRequest) {    

    const userAlreadyExists = await prismaPg.user.findFirst({
      where: {
        username: {
            equals: username,
            mode: 'insensitive'
        },
      }
    });

    if(userAlreadyExists){
      throw new Error('User already exists');
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaPg.user.create({
      data: {
        name,
        username,
        password: passwordHash
      },
    });

    return user;
  }
}