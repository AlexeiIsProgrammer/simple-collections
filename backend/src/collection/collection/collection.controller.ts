import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { StatusCodes } from 'http-status-codes';
import { CollectionEntity } from '../entity/collection.entity/collection.entity';
import { CollectionDto } from '../dto/collection.dto/collection.dto';
import { UpdateDto } from '../dto/update.dto/update.dto';
import { CreateDto } from '../dto/create.dto/create.dto';
import { BiggestCollectionDto } from '../dto/biggest_collection.dto/biggest_collection.dto';
import { ExportCollection } from '../dto/export.dto/export.dto';

@Controller('collection')
export class CollectionController {
  constructor(private collectionService: CollectionService) {}

  @Get(':userId/export')
  @HttpCode(StatusCodes.OK)
  findCollectionsToExport(
    @Param('userId') userId: number,
  ): Promise<ExportCollection[]> {
    return this.collectionService.findCollectionsToExport(userId);
  }

  @Post()
  @HttpCode(StatusCodes.NO_CONTENT)
  create(@Body() collectionBody: CollectionDto): Promise<CollectionEntity> {
    return this.collectionService.create(collectionBody);
  }

  @Patch(':id')
  @HttpCode(StatusCodes.OK)
  update(@Param('id') id: string, @Body() body: UpdateDto): Promise<void> {
    return this.collectionService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.OK)
  delete(@Param('id') id: number): Promise<void> {
    return this.collectionService.delete(id);
  }

  @Get()
  @HttpCode(StatusCodes.OK)
  findAll(): Promise<CollectionEntity[]> {
    return this.collectionService.findAll();
  }

  @Get('biggest')
  @HttpCode(StatusCodes.OK)
  findBiggestCollections(): Promise<BiggestCollectionDto[]> {
    return this.collectionService.findBiggestCollections();
  }

  @Get('user/:id')
  @HttpCode(StatusCodes.OK)
  findAllByUserId(
    @Param('id') id: number,
    @Query() { category }: { category: string },
  ): Promise<CollectionEntity[]> {
    return this.collectionService.findAllByUserId(id, category);
  }

  @Get(':userId/:collectionId')
  @HttpCode(StatusCodes.OK)
  findOne(
    @Param('userId') userId: number,
    @Param('collectionId') collectionId: number,
  ): Promise<CreateDto> {
    return this.collectionService.findOne(userId, collectionId);
  }
}
