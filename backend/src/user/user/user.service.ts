import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

      const foundUser = await this.userRepository.query(
        'SELECT * FROM users WHERE email = $1',
        [user.email],
      );

      if (foundUser.length !== 0) {
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
      const allUsers: UserEntity[] = await this.userRepository.query(
        'SELECT * FROM users ORDER BY id ASC',
      );
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

  async findOne(id: string): Promise<SecuredUser> {
    try {
      const user = await this.userRepository.query(
        'SELECT * FROM users WHERE id = $1',
        [id],
      );

      if (user.length === 0) {
        throw new HttpException("User doesn't exists", HttpStatus.NOT_FOUND);
      }

      return user[0];
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
  async login({ email, password }: LoginDto): Promise<SecuredUser> {
    try {
      const user = await this.userRepository.query(
        'SELECT * FROM users WHERE email = $1 and password = $2',
        [email, password],
      );

      if (user.length === 0) {
        throw new HttpException(
          'Email or password wrong',
          HttpStatus.NOT_FOUND,
        );
      }

      const selectedUser = user[0];
      const formattedUser = {
        id: selectedUser.id,
        name: selectedUser.name,
        email: selectedUser.email,
        status: selectedUser.status,
        role: selectedUser.role,
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
          new Promise((resolve, reject) => {
            this.userRepository
              .query(`UPDATE users SET ${field} = $1 WHERE id = $2`, [
                value,
                id,
              ])
              .then(resolve)
              .catch(reject);
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
        (id) =>
          new Promise((resolve, reject) => {
            this.userRepository
              .query('DELETE FROM users WHERE id = $1', [id])
              .then(resolve)
              .catch(reject);
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
