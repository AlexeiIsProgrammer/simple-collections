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
import { SearchModule } from './search/search.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.DB_USERNAME,
      host: process.env.HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: +process.env.DB_PORT,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
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
