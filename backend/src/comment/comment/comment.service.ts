import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../entity/comment.entity/comment.entity';
import { Repository } from 'typeorm';
import { CommentDto } from '../dto/comment.dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {}

  async create(
    itemId: number,
    commentItem: CommentDto,
  ): Promise<CommentEntity> {
    try {
      let commentEntity = new CommentEntity();
      commentEntity.name = commentItem.name;
      commentEntity.role = commentItem.role;
      commentEntity.text = commentItem.text;
      commentEntity.item_id = itemId;

      commentEntity = await this.commentRepository.save(commentEntity);

      return commentEntity;
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findCommentsByItemId(id: number): Promise<CommentEntity[]> {
    try {
      const items = await this.commentRepository.find({
        where: { item_id: id },
      });

      return items;
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findCommentById(id: number): Promise<CommentEntity[]> {
    try {
      const items = await this.commentRepository.find({
        where: { id },
      });

      return items;
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
