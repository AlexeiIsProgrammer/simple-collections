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

import { v2 as cloudinary } from 'cloudinary';
import { CollectionItemEntity } from 'src/collection_item/entity/collection_item.entity/collection_item.entity';
import { BiggestCollectionDto } from '../dto/biggest_collection.dto/biggest_collection.dto';
import { UserEntity } from 'src/user/entity/user.entity/user.entity';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(CollectionEntity)
    private collectionRepository: Repository<CollectionEntity>,
    @InjectRepository(CustomFieldEntity)
    private customFieldRepository: Repository<CustomFieldEntity>,
  ) {
    cloudinary.config({
      secure: true,
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_KEY,
      api_secret: process.env.CLOUD_SECRET,
    });
  }

  async create(collection: CollectionDto): Promise<CreateDto> {
    try {
      let collectionEntity = new CollectionEntity();

      collectionEntity.name = collection.name;
      collectionEntity.category = collection.category;
      collectionEntity.description = collection.description;
      collectionEntity.user_id = collection.user_id;

      const result = await cloudinary.uploader.upload(collection.image_url);

      collectionEntity.image_url = result.secure_url;

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
      throw new HttpException(
        'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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

      return collections;
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findBiggestCollections(): Promise<BiggestCollectionDto[]> {
    try {
      const collections = await this.collectionRepository
        .createQueryBuilder('c')
        .select([
          'c.id AS id',
          'c.name AS name',
          'u.name AS username',
          'c.user_id AS user_id',
          'c.image_url AS image_url',
          'COUNT(ci.id) as items_count',
        ])
        .innerJoin(CollectionItemEntity, 'ci', 'c.id = ci.collection_id')
        .innerJoin(UserEntity, 'u', 'c.user_id = u.id')
        .groupBy('c.id')
        .addGroupBy('c.name')
        .addGroupBy('u.name')
        .orderBy({ items_count: 'DESC' })
        .limit(5)
        .getRawMany();

      return collections;
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findAllByUserId(
    id: number,
    category: string,
  ): Promise<CollectionEntity[]> {
    try {
      const collections: CollectionEntity[] =
        await this.collectionRepository.find({
          where: { user_id: id, category: category || undefined },
        });

      return collections;
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findOne(userId: number, collectionId: number): Promise<CreateDto> {
    try {
      const collection = await this.collectionRepository.findOne({
        where: { user_id: userId, id: collectionId },
      });

      const customFields: CustomFieldEntity[] =
        await this.customFieldRepository.find({
          where: { collection_id: collectionId },
        });

      if (!collection) {
        throw new NotFoundException('Collection not found');
      }

      return { ...collection, customFields };
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
