import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CollectionItemService } from './collection_item.service';
import { CollectionItemDto } from '../dto/collection_item.dto/collection_item.dto';
import { CollectionItemEntity } from '../entity/collection_item.entity/collection_item.entity';
import { StatusCodes } from 'http-status-codes';
import { GetDto } from '../dto/get.dto/get.dto';
import { LikeEntity } from '../entity/like.entity/like.entity';
import { SortDto } from '../dto/sort.dto/sort.dto';
import { CollectionItemsByTagDto } from '../dto/collection-items-by-tag.dto/collection-items-by-tag.dto';

@Controller('collection-item')
export class CollectionItemController {
  constructor(private collectionItemService: CollectionItemService) {}

  @Put(':itemId/:userId/like')
  @HttpCode(StatusCodes.OK)
  like(
    @Param('itemId') itemId: number,
    @Param('userId') userId: number,
  ): Promise<LikeEntity> {
    return this.collectionItemService.like(itemId, userId);
  }

  @Get(':id/tag')
  @HttpCode(StatusCodes.OK)
  findCollectionItemsByTagName(
    @Param('id') id: number,
  ): Promise<CollectionItemsByTagDto[]> {
    return this.collectionItemService.findCollectionItemsByTagId(id);
  }

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
    @Param('id') id: number,
    @Body() body: { name: string },
  ): Promise<CollectionItemEntity> {
    return this.collectionItemService.update(id, body);
  }

  @Patch(':id/custom')
  @HttpCode(StatusCodes.OK)
  updateCustom(
    @Param('id') id: number,
    @Body() body: { fieldId: number; value: string }[],
  ): Promise<void> {
    return this.collectionItemService.updateCustom(id, body);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.OK)
  delete(@Param('id') id: number): Promise<void> {
    return this.collectionItemService.delete(id);
  }

  @Get()
  @HttpCode(StatusCodes.OK)
  findAll(): Promise<CollectionItemEntity[]> {
    return this.collectionItemService.findAll();
  }

  @Get(':collectionId')
  @HttpCode(StatusCodes.OK)
  findCollectionItems(
    @Param('collectionId') collectionId: number,
    @Query() query: SortDto,
  ): Promise<CollectionItemEntity[]> {
    return this.collectionItemService.findCollectionItems(collectionId, query);
  }

  @Get(':collectionId/:id')
  @HttpCode(StatusCodes.OK)
  findOne(
    @Param('collectionId') collectionId: number,
    @Param('id') id: number,
  ): Promise<GetDto> {
    return this.collectionItemService.findOne(collectionId, id);
  }
}
