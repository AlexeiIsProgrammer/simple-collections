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
import { GetDto } from '../dto/get.dto/get.dto';

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
    @Param('id') id: number,
    @Body() body: { name: string },
  ): Promise<void> {
    return this.collectionItemService.update(id, body);
  }

  @Patch(':id/:fieldId')
  @HttpCode(StatusCodes.OK)
  updateCustom(
    @Param('id') id: number,
    @Param('fieldId') fieldId: number,
    @Body() body: { value: string },
  ): Promise<void> {
    return this.collectionItemService.updateCustom(id, fieldId, body);
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
  ): Promise<CollectionItemEntity[]> {
    return this.collectionItemService.findCollectionItems(collectionId);
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
