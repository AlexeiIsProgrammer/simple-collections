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
import { CollectionService } from './collection.service';
import { StatusCodes } from 'http-status-codes';
import { CollectionEntity } from '../entity/collection.entity/collection.entity';
import { CollectionDto } from '../dto/collection.dto/collection.dto';

@Controller('collection')
export class CollectionController {
  constructor(private collectionService: CollectionService) {}

  @Post()
  @HttpCode(StatusCodes.NO_CONTENT)
  create(@Body() collectionBody: CollectionDto): Promise<CollectionEntity> {
    return this.collectionService.create(collectionBody);
  }

  @Patch(':id')
  @HttpCode(StatusCodes.OK)
  update(
    @Param('id') id: string,
    @Body() body: CollectionDto,
  ): Promise<CollectionEntity> {
    // Update collection fields (name, description, image_url, category, custom fields)
    return this.collectionService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.OK)
  delete(@Param('id') id: string): Promise<void> {
    // Delete collection
    return this.collectionService.delete(id);
  }

  @Get()
  @HttpCode(StatusCodes.OK)
  findAll(): Promise<CollectionEntity[]> {
    // Get all collections
    return this.collectionService.findAll();
  }

  @Get(':id')
  @HttpCode(StatusCodes.OK)
  findOne(@Param('id') id: string): Promise<CollectionEntity> {
    // Get one collection
    return this.collectionService.findOne(id);
  }
}
