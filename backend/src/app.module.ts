import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CollectionModule } from './collection/collection.module';
import { CollectionItemModule } from './collection_item/collection_item.module';
import { TagModule } from './tag/tag.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      host: process.env.HOST || 'localhost',
      database: 'collections_db',
      password: 'qwerty',
      port: +process.env.DB_PORT || 5432,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    UserModule,
    CollectionModule,
    CollectionItemModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
