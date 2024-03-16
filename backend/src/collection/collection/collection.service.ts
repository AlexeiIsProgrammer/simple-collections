import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CollectionEntity } from '../entity/collection.entity/collection.entity';
import { CollectionDto } from '../dto/collection.dto/collection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomFieldEntity } from '../entity/custom_field.entity/custom_field.entity';
import { CreateDto } from '../dto/create.dto/create.dto';
import { UpdateDto } from '../dto/update.dto/update.dto';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(CollectionEntity)
    private collectionRepository: Repository<CollectionEntity>,
    @InjectRepository(CustomFieldEntity)
    private customFieldRepository: Repository<CustomFieldEntity>,
  ) {}

  async create(collection: CollectionDto): Promise<CreateDto> {
    try {
      let collectionEntity = new CollectionEntity();

      collectionEntity.name = collection.name;
      collectionEntity.category = collection.category;
      collectionEntity.description = collection.description;
      collectionEntity.image_url = collection.image_url;
      collectionEntity.user_id = collection.user_id;

      collectionEntity = await this.collectionRepository.save(collectionEntity);

      const customFieldPromises = collection.customFields.map(
        ({ type, name, state }) =>
          new Promise<CustomFieldEntity>(async (resolve, reject) => {
            try {
              let customFieldEntity = new CustomFieldEntity();

              customFieldEntity.name = name;
              customFieldEntity.type = type;
              customFieldEntity.state = state;
              customFieldEntity.collection_id = collectionEntity.id;

              customFieldEntity =
                await this.customFieldRepository.save(customFieldEntity);

              resolve(customFieldEntity);
            } catch (err) {
              reject(err);
            }
          }),
      );

      const customFields = await Promise.all(customFieldPromises);

      return { ...collectionEntity, customFields };
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async update(id: string, { value, field }: UpdateDto): Promise<void> {
    try {
      await this.collectionRepository.query(
        `UPDATE collections SET ${field} = $1 WHERE id = $2`,
        [value, id],
      );
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const collection = await this.collectionRepository.findOne({
        where: { id },
      });

      if (!collection) {
        throw new NotFoundException('Collection not found');
      }

      await this.collectionRepository.remove(collection);
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
  async findAll(): Promise<CollectionEntity[]> {
    try {
      const collections: CollectionEntity[] =
        await this.collectionRepository.find();

      if (collections.length === 0) {
        throw new NotFoundException('Collections not found');
      }

      return collections;
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
  async findOne(id: number): Promise<CollectionEntity> {
    try {
      const collection = await this.collectionRepository.findOne({
        where: { id },
      });

      if (!collection) {
        throw new NotFoundException('Collection not found');
      }

      return collection;
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
