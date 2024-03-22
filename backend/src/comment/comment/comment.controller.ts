import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentEntity } from '../entity/comment.entity/comment.entity';
import { StatusCodes } from 'http-status-codes';
import { CommentDto } from '../dto/comment.dto/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  create(
    @Param('id') itemId: number,
    @Body() commentItem: CommentDto,
  ): Promise<CommentEntity> {
    return this.commentService.create(itemId, commentItem);
  }

  @Get(':id/all')
  @HttpCode(StatusCodes.OK)
  findCommentsByItemId(@Param('id') itemId: number): Promise<CommentEntity[]> {
    return this.commentService.findCommentsByItemId(itemId);
  }

  @Get(':id')
  @HttpCode(StatusCodes.OK)
  findCommentById(@Param('id') commentId: number): Promise<CommentEntity[]> {
    return this.commentService.findCommentById(commentId);
  }
}
