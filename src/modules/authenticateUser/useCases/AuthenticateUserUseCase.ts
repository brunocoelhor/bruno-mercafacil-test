import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { prismaPg } from '../../../database/prismaClient';

interface IRequest {
  username: string;
  password: string;
}

export class AuthenticateUserUserCase {
    async execute({ username, password }: IRequest) {
        const { SECRET_KEY_MACAPA, SECRET_KEY_VAREJA0 } = process.env;
        let secretKey: string;

        const userAlreadyExists = await prismaPg.user.findFirst({
            where: {
                username
            }
        });

        if(!userAlreadyExists){
            throw new Error('User or password incorrect!');
        }

        const passwordMatch = await compare(password, userAlreadyExists.password);

        if(!passwordMatch) {
            throw new Error('User or password incorrect!');
        }

        if (username === 'varejao') {
            secretKey = SECRET_KEY_VAREJA0;
        } else if(username === 'macapa') {
            secretKey = SECRET_KEY_MACAPA;
        }
        
        const token = sign({}, secretKey, {
            subject: userAlreadyExists.username,
            expiresIn: '120s'
        });

        return {token};
    }
}