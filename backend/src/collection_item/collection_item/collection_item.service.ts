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

@Injectable()
export class CollectionItemService {
  constructor(
    @InjectRepository(CollectionItemEntity)
    private collectionItemRepository: Repository<CollectionItemEntity>,
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

  async update(id: number, body: { name: string }): Promise<void> {
    try {
      await this.collectionItemRepository.query(
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
    fieldId: number,
    { value }: { value: string },
  ): Promise<void> {
    try {
      await this.collectionItemRepository.query(
        `UPDATE collection_item_custom_fields SET value = $1 WHERE custom_field_id = $2 and collection_item_id = $3`,
        [value, fieldId, id],
      );
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

  async findOne(id: number): Promise<GetDto> {
    try {
      const item = await this.collectionItemRepository.findOne({
        where: { id },
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

      if (!customFields) {
        throw new HttpException("Fields don't exists", HttpStatus.NOT_FOUND);
      }

      return { ...item, customFields };
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
