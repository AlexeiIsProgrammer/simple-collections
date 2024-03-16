import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CollectionEntity } from '../entity/collection.entity/collection.entity';
import { Repository } from 'typeorm';
import { CollectionDto } from '../dto/collection.dto/collection.dto';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(CollectionEntity)
    private collectionRepository: Repository<CollectionEntity>,
  ) {}

  async create(collection: CollectionDto): Promise<CollectionEntity> {
    return { id: 1, ...collection };
  }

  async update(id: string, body: CollectionDto): Promise<CollectionEntity> {
    return { id: +id, ...body };
  }

  async delete(id: string): Promise<void> {
    return;
  }
  async findAll(): Promise<CollectionEntity[]> {
    return [];
  }
  async findOne(id: string): Promise<CollectionEntity> {
    return {};
  }
}
