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
import { CollectionItemService } from './collection_item.service';
import { CollectionItemDto } from '../dto/collection_item.dto/collection_item.dto';
import { CollectionItemEntity } from '../entity/collection_item.entity/collection_item.entity';
import { StatusCodes } from 'http-status-codes';
import { CollectionEntity } from 'src/collection/entity/collection.entity/collection.entity';

@Controller('collection-item')
export class CollectionItemController {
  constructor(private collectionItemService: CollectionItemService) {}

  @Post()
  @HttpCode(StatusCodes.NO_CONTENT)
  create(
    @Body() collectionItem: CollectionItemDto,
  ): Promise<CollectionItemEntity> {
    return this.collectionItemService.create(collectionItem);
  }

  @Patch(':id')
  @HttpCode(StatusCodes.OK)
  update(
    @Param('id') id: string,
    @Body() body: CollectionItemEntity,
  ): Promise<CollectionItemEntity> {
    return this.collectionItemService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.OK)
  delete(@Param('id') id: string): Promise<void> {
    return this.collectionItemService.delete(id);
  }

  @Get()
  @HttpCode(StatusCodes.OK)
  findAll(): Promise<CollectionItemEntity[]> {
    return this.collectionItemService.findAll();
  }

  @Get(':id')
  @HttpCode(StatusCodes.OK)
  findOne(@Param('id') id: string): Promise<CollectionEntity> {
    return this.collectionItemService.findOne(id);
  }
}
