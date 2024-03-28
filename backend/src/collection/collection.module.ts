import { Module } from '@nestjs/common';
import { CollectionController } from './collection/collection.controller';
import { CollectionService } from './collection/collection.service';
import { CollectionEntity } from './entity/collection.entity/collection.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomFieldEntity } from './entity/custom_field.entity/custom_field.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionEntity, CustomFieldEntity])],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
