import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  nome: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ nome, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const hashPassword = await hash(password, 8);

    const user = usersRepository.create({
      nome,
      email,
      password: hashPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
