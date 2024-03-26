import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionModule } from './collection/collection.module';
import { CollectionItemModule } from './collection_item/collection_item.module';
import { TagModule } from './tag/tag.module';
import { CommentModule } from './comment/comment.module';
import { SearchModule } from './search/search.module';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    CollectionModule,
    CollectionItemModule,
    TagModule,
    CommentModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
