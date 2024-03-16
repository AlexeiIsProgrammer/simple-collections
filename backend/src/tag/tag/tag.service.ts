import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from '../entity/tag.entity/tag.entity';
import { Repository } from 'typeorm';
import { TagDto } from '../dto/tag.dto/tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
  ) {}

  async create(tag: TagDto): Promise<TagEntity> {
    return { id: 1, ...tag };
  }
  async findAll(): Promise<TagEntity[]> {
    return [];
  }

  async findOne(id: string): Promise<TagEntity> {
    return { id: 1, name: 'Tag' };
  }
}
