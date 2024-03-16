import { Module } from '@nestjs/common';
import { CollectionItemController } from './collection_item/collection_item.controller';
import { CollectionItemService } from './collection_item/collection_item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionItemEntity } from './entity/collection_item.entity/collection_item.entity';
import { CollectionItemCustomFieldEntity } from './entity/collection_item_custom_field.entity/collection_item_custom_field.entity';
import { CustomFieldEntity } from 'src/collection/entity/custom_field.entity/custom_field.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CollectionItemEntity,
      CollectionItemCustomFieldEntity,
      CustomFieldEntity,
    ]),
  ],
  controllers: [CollectionItemController],
  providers: [CollectionItemService],
})
export class CollectionItemModule {}
