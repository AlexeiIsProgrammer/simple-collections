import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { TagService } from './tag.service';
import { StatusCodes } from 'http-status-codes';
import { TagDto } from '../dto/tag.dto/tag.dto';
import { TagEntity } from '../entity/tag.entity/tag.entity';

@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Post()
  @HttpCode(StatusCodes.NO_CONTENT)
  create(@Body() tag: TagDto): Promise<TagEntity> {
    return this.tagService.create(tag);
  }

  @Get()
  @HttpCode(StatusCodes.OK)
  findAll(): Promise<TagEntity[]> {
    return this.tagService.findAll();
  }

  @Get(':id')
  @HttpCode(StatusCodes.OK)
  findOne(@Param('id') id: string): Promise<TagEntity> {
    return this.tagService.findOne(id);
  }
}
