import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from '../entity/tag.entity/tag.entity';
import { Repository } from 'typeorm';
import { CreateDto } from '../dto/create.dto/create.dto';
import { CollectionItemTagEntity } from '../entity/collection_item_tag.entity/collection_item_tag.entity';
import { DeleteDto } from '../dto/delete.dto/delete.dto';
import { ActionTypeEnum, UpdateDto } from '../dto/update.dto/update.dto';
import { ChangeDto } from '../dto/change.dto/change.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
    @InjectRepository(CollectionItemTagEntity)
    private collectionItemTagRepository: Repository<CollectionItemTagEntity>,
  ) {}

  async create({ item_id, tag }: CreateDto): Promise<TagEntity> {
    try {
      const foundTag = await this.tagRepository.findOne({
        where: { name: tag.name },
      });

      let tagEntity: TagEntity;

      if (!foundTag) {
        tagEntity = new TagEntity();

        tagEntity.name = tag.name;

        tagEntity = await this.tagRepository.save(tagEntity);
      } else {
        tagEntity = foundTag;
      }

      let collectionItemTagEntity = new CollectionItemTagEntity();

      collectionItemTagEntity.collection_item_id = item_id;
      collectionItemTagEntity.tag_id = tagEntity.id;

      collectionItemTagEntity = await this.collectionItemTagRepository.save(
        collectionItemTagEntity,
      );

      return tagEntity;
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async delete({ item_id, tag_id }: DeleteDto): Promise<void> {
    try {
      const collectionItemTag = await this.collectionItemTagRepository.findOne({
        where: { collection_item_id: item_id, tag_id },
      });

      if (!collectionItemTag) {
        throw new NotFoundException('Collection item tag not found');
      }

      await this.collectionItemTagRepository.remove(collectionItemTag);
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async change({ item_id, tag_id, name }: ChangeDto): Promise<void> {
    try {
      const foundTag = await this.tagRepository.findOne({
        where: { name },
      });

      let tagEntity: TagEntity;

      if (!foundTag) {
        tagEntity = new TagEntity();

        tagEntity.name = name;

        tagEntity = await this.tagRepository.save(tagEntity);
      } else {
        tagEntity = foundTag;
      }

      await this.collectionItemTagRepository.query(
        `UPDATE collection_item_tags SET tag_id = $1 WHERE collection_item_id = $2 AND tag_id = $3`,
        [tagEntity.id, item_id, tag_id],
      );
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async update({ id: item_id, actions }: UpdateDto): Promise<void> {
    try {
      const tagsPromises = actions.map(
        ({ type, id, value }) =>
          new Promise<void>(async (resolve, reject) => {
            try {
              switch (type) {
                case ActionTypeEnum.create: {
                  this.create({ item_id, tag: { name: value } });
                  break;
                }
                case ActionTypeEnum.delete: {
                  this.delete({ item_id, tag_id: id });
                  break;
                }
                case ActionTypeEnum.update: {
                  this.change({ item_id, tag_id: id, name: value });
                  break;
                }
                default:
                  break;
              }
              resolve();
            } catch (err) {
              reject(err);
            }
          }),
      );

      await Promise.all(tagsPromises);
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findAll(): Promise<TagEntity[]> {
    try {
      const tags: TagEntity[] = await this.tagRepository.find();

      return tags;
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findByCollectionItem(id: number): Promise<TagEntity> {
    try {
      const tags = await this.tagRepository.query(
        `SELECT tags.*
      FROM tags
      JOIN collection_item_tags ON tags.id = collection_item_tags.tag_id
      WHERE collection_item_tags.collection_item_id = $1;`,
        [id],
      );

      return tags;
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
