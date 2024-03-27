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

    const collectionItems = await this.collectionItemRepository.query(
      `
    SELECT c.user_id AS user_id, ci.name AS name, ci.id AS id,
          ci.collection_id AS collection_id,
          array_agg(DISTINCT jsonb_build_object('name', t.name, 'id', t.id)) AS tags,
          array_agg(DISTINCT jsonb_build_object('name', com.name, 'text', com.text, 'id', com.id)) AS comments
    FROM collection_items ci
    LEFT JOIN collections c ON ci.collection_id = c.id
    LEFT JOIN collection_item_custom_fields cif ON ci.id = cif.collection_item_id
    LEFT JOIN collection_item_tags ct ON ci.id = ct.collection_item_id
    LEFT JOIN tags t ON t.id = ct.tag_id
    LEFT JOIN comments com ON ci.id = com.item_id
    WHERE to_tsvector('english', ci.name) @@ plainto_tsquery('english', $1)
    OR to_tsvector('english', t.name) @@ plainto_tsquery('english', $1)
    OR to_tsvector('english', com.text) @@ plainto_tsquery('english', $1)
    GROUP BY ci.id, c.user_id
  `,
      [`${q}:*`],
    );

    const collections = await this.collectionRepository.query(
      `
    SELECT c.*,
           array_agg(DISTINCT jsonb_build_object('id', cf.id, 'name', cf.name, 'type', cf.type, 'state', cf.state)) AS customFields
    FROM collections c
    LEFT JOIN custom_fields cf ON c.id = cf.collection_id
    WHERE to_tsvector('english', c.name || ' ' || c.description || ' ' || c.category || ' ' || cf.name) @@ plainto_tsquery('english', $1)
    GROUP BY c.id, c.name, c.description, c.category
  `,
      [`${q}:*`],
    );

    return {
      collections: collections,
      items: collectionItems,
    };
  }
}
