import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserDto } from '../dto/user.dto/user.dto';
import { UserService } from './user.service';
import { UserEntity } from '../entity/user.entity/user.entity';
import { StatusCodes } from 'http-status-codes';
import { UpdateDto } from '../dto/update.dto/update.dto';
import { DeleteDto } from '../dto/delete.dto/delete.dto';

type SecuredUser = Omit<UserEntity, 'password'>;

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(StatusCodes.OK)
  create(@Body() user: UserDto): Promise<UserEntity> {
    return this.userService.create(user);
  }

  @Get()
  @HttpCode(StatusCodes.OK)
  findAll(): Promise<SecuredUser[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(StatusCodes.OK)
  findOne(@Param('id') id: string): Promise<SecuredUser> {
    return this.userService.findOne(id);
  }

  @Post('login')
  @HttpCode(StatusCodes.OK)
  login(@Body() user: UserDto): Promise<SecuredUser> {
    return this.userService.login(user);
  }

  @Patch()
  @HttpCode(StatusCodes.OK)
  update(@Body() actions: UpdateDto) {
    return this.userService.update(actions);
  }

  @Delete()
  @HttpCode(StatusCodes.OK)
  delete(@Body() ids: DeleteDto) {
    return this.userService.delete(ids);
  }
}
