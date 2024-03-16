import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto/user.dto';
import { LoginDto } from '../dto/login.dto/login.dto';
import { UpdateDto } from '../dto/update.dto/update.dto';
import { DeleteDto } from '../dto/delete.dto/delete.dto';

type SecuredUser = Omit<UserEntity, 'password'>;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(user: UserDto): Promise<UserEntity> {
    try {
      if (user.password !== user.repeatPassword) {
        throw new HttpException('Passwords must match', HttpStatus.CONFLICT);
      }
      const foundUser = await this.userRepository.findOne({
        where: { email: user.email },
      });

      if (!foundUser) {
        throw new HttpException(
          'User with this email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      let userEntity = new UserEntity();
      userEntity.email = user.email;
      userEntity.name = user.name;
      userEntity.password = user.password;
      userEntity.status = 'active';
      userEntity.role = 'user';

      userEntity = await this.userRepository.save(userEntity);

      return userEntity;
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findAll(): Promise<SecuredUser[]> {
    try {
      const allUsers = await this.userRepository.find();
      const formattedUsers = allUsers.map((user) => {
        const formattedUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          status: user.status,
          role: user.role,
        };

        return formattedUser;
      });

      return formattedUsers;
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findOne(id: number): Promise<SecuredUser> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new HttpException("User doesn't exists", HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
  async login({ email, password }: LoginDto): Promise<SecuredUser> {
    try {
      const user = await this.userRepository.findOne({
        where: { email, password },
      });

      if (!user) {
        throw new HttpException(
          'Email or password wrong',
          HttpStatus.NOT_FOUND,
        );
      }

      const formattedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
        role: user.role,
      };

      return formattedUser;
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
  async update({ actions }: UpdateDto): Promise<void> {
    try {
      const actionsPromises = actions.map(
        ({ field, id, value }) =>
          new Promise<void>(async (resolve, reject) => {
            try {
              await this.userRepository.query(
                `UPDATE users SET ${field} = $1 WHERE id = $2`,
                [value, id],
              );
              resolve();
            } catch (err) {
              reject(err);
            }
          }),
      );

      await Promise.all(actionsPromises);
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
  async delete({ ids }: DeleteDto): Promise<void> {
    try {
      const actionsPromises = ids.map(
        ({ id }) =>
          new Promise<void>(async (resolve, reject) => {
            const user = await this.userRepository.findOne({
              where: { id },
            });

            if (!user) {
              throw new NotFoundException('User not found');
            }

            try {
              await this.userRepository.remove(user);

              resolve();
            } catch (err) {
              reject(err);
            }
          }),
      );

      await Promise.all(actionsPromises);
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
