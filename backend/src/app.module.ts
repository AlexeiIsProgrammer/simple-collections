import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CollectionModule } from './collection/collection.module';
import { CollectionItemModule } from './collection_item/collection_item.module';
import { TagModule } from './tag/tag.module';
import { CommentModule } from './comment/comment.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.DB_USERNAME || 'postgres',
      host: process.env.HOST || 'localhost',
      database: process.env.DB_NAME || 'collections_db',
      password: process.env.DB_PASSWORD || 'qwerty',
      port: +process.env.DB_PORT || 5432,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    UserModule,
    CollectionModule,
    CollectionItemModule,
    TagModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
