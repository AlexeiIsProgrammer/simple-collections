import { Injectable } from '@nestjs/common';
import {
  SearchCollectionEntity,
  SearchItemEntity,
} from '../entity/search.entity/search.entity';
import { CollectionEntity } from 'src/collection/entity/collection.entity/collection.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from 'src/tag/entity/tag.entity/tag.entity';
import { CollectionItemEntity } from 'src/collection_item/entity/collection_item.entity/collection_item.entity';
import { CommentEntity } from 'src/comment/entity/comment.entity/comment.entity';
import { CollectionItemTagEntity } from 'src/tag/entity/collection_item_tag.entity/collection_item_tag.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(CollectionEntity)
    private readonly collectionRepository: Repository<CollectionEntity>,
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(CollectionItemEntity)
    private readonly collectionItemRepository: Repository<CollectionItemEntity>,
  ) {}

  async search(q: string): Promise<{
    collections: SearchCollectionEntity[];
    items: SearchItemEntity[];
  }> {
    if (q === '') {
      return { collections: [], items: [] };
    }

    const collectionItems = await this.collectionItemRepository
      .createQueryBuilder('ci')
      .select([
        'c.id AS collection_id',
        'c.user_id AS user_id',
        'ci.id AS id',
        'ci.name AS name',
        `json_agg(json_build_object('id', t.id, 'name', t.name)) AS tags`,
        // `json_agg(json_build_object('id', c.id, 'text', c.text)) AS comments`,
      ])
      .leftJoin(CollectionEntity, 'c', 'c.id = ci.collection_id')
      .leftJoin(
        CollectionItemTagEntity,
        'cit',
        'cit.collection_item_id = ci.id',
      )
      .leftJoin(TagEntity, 't', 't.id = cit.tag_id')
      //   .innerJoin(CommentEntity, 'c', 'ci.id = c.item_id')
      .where(
        `to_tsvector('simple', ci.name || ' ' || t.name ) @@ to_tsquery('simple', :q)`,
        {
          q: `'${q}':*`,
        },
      )
      .groupBy('ci.id, c.id')
      .getRawMany();

    // const tags = await this.tagRepository
    //   .createQueryBuilder('t')
    //   .select(
    //     't.*, cit.collection_item_id AS collection_item_id, ci.name as collection_item_name',
    //   )
    //   .innerJoin(CollectionItemTagEntity, 'cit', 't.id = cit.tag_id')
    //   .innerJoin(CollectionItemEntity, 'ci', 'ci.id = cit.collection_item_id')
    //   .where(`to_tsvector('simple', t.name ) @@ to_tsquery('simple', :q)`, {
    //     q: `${q}:*`,
    //   })
    //   .getRawMany();

    // const comments = await this.commentRepository
    //   .createQueryBuilder('c')
    //   .select(
    //     'c.*, ci.name AS collection_item_name, ci.id AS collection_item_id',
    //   )
    //   .innerJoin(CollectionItemEntity, 'ci', 'c.item_id = ci.id')
    //   .where(
    //     `to_tsvector('simple', c.name || ' ' || c.text ) @@ to_tsquery('simple', :q)`,
    //     {
    //       q: `${q}:*`,
    //     },
    //   )
    //   .getRawMany();

    const collections = await this.collectionRepository
      .createQueryBuilder('c')
      .select('c.*')
      .where(
        `to_tsvector('simple', c.name || ' ' || c.description || ' ' || c.category) @@ to_tsquery('simple', :q)`,
        {
          q: `'${q}':*`,
        },
      )
      .getRawMany();

    return {
      collections: collections,
      items: collectionItems,
    };
  }
}
