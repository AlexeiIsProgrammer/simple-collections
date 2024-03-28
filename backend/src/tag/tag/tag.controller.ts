import { Body, Controller, Get, HttpCode, Param, Put } from '@nestjs/common';
import { TagService } from './tag.service';
import { StatusCodes } from 'http-status-codes';
import { TagEntity } from '../entity/tag.entity/tag.entity';
import { UpdateDto } from '../dto/update.dto/update.dto';

@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Put()
  @HttpCode(StatusCodes.OK)
  update(@Body() body: UpdateDto): Promise<void> {
    return this.tagService.update(body);
  }

  @Get()
  @HttpCode(StatusCodes.OK)
  findAll(): Promise<TagEntity[]> {
    return this.tagService.findAll();
  }

  @Get(':id/info')
  @HttpCode(StatusCodes.OK)
  findOne(@Param('id') id: number): Promise<TagEntity> {
    return this.tagService.findOne(id);
  }

  @Get(':id')
  @HttpCode(StatusCodes.OK)
  findByCollectionItem(@Param('id') id: number): Promise<TagEntity[]> {
    return this.tagService.findByCollectionItem(id);
  }
}
