import { Module } from '@nestjs/common';
import { SearchController } from './search/search.controller';
import { SearchService } from './search/search.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionEntity } from 'src/collection/entity/collection.entity/collection.entity';
import { CollectionItemEntity } from 'src/collection_item/entity/collection_item.entity/collection_item.entity';
import {
  SearchCollectionEntity,
  SearchItemEntity,
} from './entity/search.entity/search.entity';
import { TagEntity } from 'src/tag/entity/tag.entity/tag.entity';
import { CommentEntity } from 'src/comment/entity/comment.entity/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SearchCollectionEntity,
      SearchItemEntity,
      CollectionEntity,
      CollectionItemEntity,
      TagEntity,
      CommentEntity,
    ]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
