import { Module } from '@nestjs/common';
import { CollectionController } from './collection/collection.controller';
import { CollectionService } from './collection/collection.service';

@Module({
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
