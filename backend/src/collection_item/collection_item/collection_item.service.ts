import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectionItemDto } from '../dto/collection_item.dto/collection_item.dto';
import { CollectionItemEntity } from '../entity/collection_item.entity/collection_item.entity';
import { CollectionItemCustomFieldEntity } from '../entity/collection_item_custom_field.entity/collection_item_custom_field.entity';
import { CustomFieldEntity } from 'src/collection/entity/custom_field.entity/custom_field.entity';
import { CreateDto } from '../dto/create.dto/create.dto';
import { GetDto } from '../dto/get.dto/get.dto';
import { LikeEntity } from '../entity/like.entity/like.entity';
import { SortDto } from '../dto/sort.dto/sort.dto';
import { CollectionItemsByTagDto } from '../dto/collection-items-by-tag.dto/collection-items-by-tag.dto';

@Injectable()
export class CollectionItemService {
  constructor(
    @InjectRepository(CollectionItemEntity)
    private collectionItemRepository: Repository<CollectionItemEntity>,
    @InjectRepository(LikeEntity)
    private likeRepository: Repository<LikeEntity>,
    @InjectRepository(CollectionItemCustomFieldEntity)
    private collectionItemCustomFieldRepository: Repository<CollectionItemCustomFieldEntity>,
    @InjectRepository(CustomFieldEntity)
    private customFieldRepository: Repository<CustomFieldEntity>,
  ) {}

  async create(collectionItem: CollectionItemDto): Promise<CreateDto> {
    try {
      let itemEntity = new CollectionItemEntity();
      itemEntity.collection_id = collectionItem.collection_id;
      itemEntity.name = collectionItem.name;

      itemEntity = await this.collectionItemRepository.save(itemEntity);

      const collectionCustomFields = await this.customFieldRepository.find({
        where: { collection_id: collectionItem.collection_id },
      });

      const customFieldPromises = collectionCustomFields.map(
        ({ id }) =>
          new Promise<CollectionItemCustomFieldEntity>(
            async (resolve, reject) => {
              try {
                let collectionItemCustomFieldEntity =
                  new CollectionItemCustomFieldEntity();

                collectionItemCustomFieldEntity.collection_item_id =
                  itemEntity.id;
                collectionItemCustomFieldEntity.custom_field_id = id;
                collectionItemCustomFieldEntity.value = '';

                collectionItemCustomFieldEntity =
                  await this.collectionItemCustomFieldRepository.save(
                    collectionItemCustomFieldEntity,
                  );

                resolve(collectionItemCustomFieldEntity);
              } catch (err) {
                reject(err);
              }
            },
          ),
      );

      const customFields = await Promise.all(customFieldPromises);

      return { ...itemEntity, customFields };
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async like(itemId: number, userId: number): Promise<LikeEntity> {
    try {
      const like = await this.likeRepository.findOne({
        where: { user_id: userId },
      });

      if (like) {
        return await this.likeRepository.remove(like);
      } else {
        let likeEntity = new LikeEntity();
        likeEntity.item_id = itemId;
        likeEntity.user_id = userId;

        likeEntity = await this.likeRepository.save(likeEntity);

        return likeEntity;
      }
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async update(
    id: number,
    body: { name: string },
  ): Promise<CollectionItemEntity> {
    try {
      return await this.collectionItemRepository.query(
        `UPDATE collection_items SET name = $1 WHERE id = $2`,
        [body.name, id],
      );
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async updateCustom(
    id: number,
    actions: { fieldId: number; value: string }[],
  ): Promise<void> {
    try {
      const customFieldPromises = actions.map(
        ({ fieldId, value }) =>
          new Promise<CollectionItemCustomFieldEntity>(
            async (resolve, reject) => {
              try {
                const updatedItem = await this.collectionItemRepository.query(
                  `UPDATE collection_item_custom_fields SET value = $1 WHERE custom_field_id = $2 and collection_item_id = $3`,
                  [value, fieldId, id],
                );
                resolve(updatedItem);
              } catch (err) {
                reject(err);
              }
            },
          ),
      );

      await Promise.all(customFieldPromises);
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const collectionItem = await this.collectionItemRepository.findOne({
        where: { id },
      });

      if (!collectionItem) {
        throw new NotFoundException('Collection item not found');
      }

      await this.collectionItemRepository.remove(collectionItem);
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findCollectionItems(
    collectionId: number,
    { name }: SortDto,
  ): Promise<GetDto[]> {
    try {
      const items = await this.collectionItemRepository.find({
        where: { collection_id: collectionId },
        order: {
          name: name || undefined,
        },
      });

      const customFieldPromises = items.map(
        (item) =>
          new Promise<GetDto>(async (resolve, reject) => {
            try {
              const customFields = await this.collectionItemRepository
                .createQueryBuilder('ci')
                .select([
                  'cf.id AS id',
                  'cf.type AS type',
                  'cf.name AS name',
                  'cf.state AS state',
                  'cif.value AS value',
                ])
                .innerJoin(
                  CollectionItemCustomFieldEntity,
                  'cif',
                  'cif.collection_item_id = ci.id',
                )
                .innerJoin(
                  CustomFieldEntity,
                  'cf',
                  'cf.id = cif.custom_field_id',
                )
                .where('ci.collection_id = :collectionId', { collectionId })
                .andWhere('ci.id = :itemId', { itemId: item.id })
                .andWhere('cf.type IN (:...types)', {
                  types: ['date', 'string'],
                })
                .getRawMany();

              const likes = await this.likeRepository.find({
                where: {
                  item_id: item.id,
                },
              });

              resolve({
                ...item,
                customFields,
                likes,
              });
            } catch (err) {
              reject(err);
            }
          }),
      );

      return await Promise.all(customFieldPromises);
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findAll(): Promise<CollectionItemEntity[]> {
    try {
      const items = await this.collectionItemRepository.find();

      return items;
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findOne(collectionId: number, id: number): Promise<GetDto> {
    try {
      const item = await this.collectionItemRepository.findOne({
        where: { collection_id: collectionId, id },
      });

      const customFields = await this.collectionItemRepository.query(
        `SELECT 
        cf.id AS id,
        cf.type AS type,
        cf.name AS name,
        cf.state AS state,
               cif.value AS value
        FROM collection_items ci
        JOIN collection_item_custom_fields cif ON ci.id = cif.collection_item_id
        JOIN custom_fields cf ON cif.custom_field_id = cf.id
        WHERE ci.collection_id = $1 and ci.id = $2;`,
        [item.collection_id, item.id],
      );

      const likes = await this.likeRepository.find({
        where: {
          item_id: item.id,
        },
      });

      if (!customFields) {
        throw new HttpException("Fields don't exists", HttpStatus.NOT_FOUND);
      }

      return { ...item, customFields, likes };
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findCollectionItemsByTagId(
    id: number,
  ): Promise<CollectionItemsByTagDto[]> {
    try {
      const items = await this.collectionItemRepository.query(
        `SELECT collection_items.*, collections.user_id, collections.name as collection_name
      FROM collection_items
      JOIN collection_item_tags ON collection_items.id = collection_item_tags.collection_item_id
      JOIN collections ON collections.id = collection_items.collection_id
      WHERE collection_item_tags.tag_id = $1;`,
        [id],
      );

      return items;
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
