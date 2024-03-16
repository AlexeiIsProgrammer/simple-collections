import { Module } from '@nestjs/common';
import { CollectionItemController } from './collection_item/collection_item.controller';
import { CollectionItemService } from './collection_item/collection_item.service';

@Module({
  controllers: [CollectionItemController],
  providers: [CollectionItemService],
})
export class CollectionItemModule {}
