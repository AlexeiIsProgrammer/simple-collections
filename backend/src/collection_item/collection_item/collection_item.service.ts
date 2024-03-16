import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectionItemDto } from '../dto/collection_item.dto/collection_item.dto';
import { CollectionItemEntity } from '../entity/collection_item.entity/collection_item.entity';

@Injectable()
export class CollectionItemService {
  constructor(
    @InjectRepository(CollectionItemService)
    private collectionItemRepository: Repository<CollectionItemService>,
  ) {}

  async create(
    collectionItem: CollectionItemDto,
  ): Promise<CollectionItemEntity> {
    return { id: 1, ...collectionItem };
  }
  async update(
    id: string,
    body: CollectionItemEntity,
  ): Promise<CollectionItemEntity> {
    return body;
  }
  async delete(id: string): Promise<void> {
    return;
  }
  async findAll(): Promise<CollectionItemEntity[]> {
    return [];
  }
  async findOne(id: string): Promise<CollectionItemEntity> {
    return {};
  }
}
