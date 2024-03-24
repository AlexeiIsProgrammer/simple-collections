import { IsArray } from 'class-validator';
import { CommentEntity } from 'src/comment/entity/comment.entity/comment.entity';
import { TagEntity } from 'src/tag/entity/tag.entity/tag.entity';
import { Column } from 'typeorm';

export class SearchCollectionEntity {
  @Column()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  user_id: string;
}

export class SearchItemEntity {
  @Column()
  id: number;

  @Column()
  name: string;

  @IsArray()
  comments: CommentEntity[];

  @IsArray()
  tags: TagEntity[];

  @Column()
  collection_id: string;

  @Column()
  user_id: string;
}
