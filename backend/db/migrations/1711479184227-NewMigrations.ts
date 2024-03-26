import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1711479184227 implements MigrationInterface {
    name = 'NewMigrations1711479184227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "role" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "collections" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "image_url" character varying NOT NULL, "user_id" integer NOT NULL, "category" character varying NOT NULL, "userIdId" integer, CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ed225078e8bf65b448b69105b4" ON "collections" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_f90696fbdbcf7b0b040382551e" ON "collections" ("description") `);
        await queryRunner.query(`CREATE INDEX "IDX_36c2392659f1a83c0e1bb42779" ON "collections" ("category") `);
        await queryRunner.query(`CREATE TABLE "collection_items" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "collection_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "collectionIdId" integer, CONSTRAINT "PK_5f299da96958a920ab58871ea57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dda83a6f5295a6d7a5cdcc4c67" ON "collection_items" ("name") `);
        await queryRunner.query(`CREATE TABLE "likes" ("id" SERIAL NOT NULL, "item_id" integer NOT NULL, "user_id" integer NOT NULL, "itemIdId" integer, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "text" character varying NOT NULL, "item_id" integer NOT NULL, "role" character varying NOT NULL, "itemIdId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b22159685b114d104511b537fa" ON "comments" ("text") `);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d90243459a697eadb8ad56e909" ON "tags" ("name") `);
        await queryRunner.query(`CREATE TABLE "collection_item_tags" ("collection_item_id" integer NOT NULL, "tag_id" integer NOT NULL, "collectionItemIdId" integer, "tagIdId" integer, CONSTRAINT "PK_13522f3846e4d2d0adcd584cc13" PRIMARY KEY ("collection_item_id", "tag_id"))`);
        await queryRunner.query(`CREATE TABLE "custom_fields" ("id" SERIAL NOT NULL, "collection_id" integer NOT NULL, "type" character varying NOT NULL, "name" character varying NOT NULL, "state" character varying NOT NULL, "collectionIdId" integer, CONSTRAINT "PK_35ab958a0baec2e0b2b2b875fdb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "collection_item_custom_fields" ("value" character varying NOT NULL, "collection_item_id" integer NOT NULL, "custom_field_id" integer NOT NULL, "collectionItemIdId" integer, "customFieldIdId" integer, CONSTRAINT "PK_2009d3d831e38dcd8b57b4ffa60" PRIMARY KEY ("collection_item_id", "custom_field_id"))`);
        await queryRunner.query(`ALTER TABLE "collections" ADD CONSTRAINT "FK_f9aa46fff6f68d76a71d65df6d5" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collection_items" ADD CONSTRAINT "FK_32e76b676e06b5bb24c68194a78" FOREIGN KEY ("collectionIdId") REFERENCES "collections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_1735b43a2674692e5620c78d02c" FOREIGN KEY ("itemIdId") REFERENCES "collection_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_67efeade3b8abda682d394279a2" FOREIGN KEY ("itemIdId") REFERENCES "collection_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collection_item_tags" ADD CONSTRAINT "FK_41c930f8ef78d5eee075db78010" FOREIGN KEY ("collectionItemIdId") REFERENCES "collection_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collection_item_tags" ADD CONSTRAINT "FK_453a5baf00ac509141644991e3d" FOREIGN KEY ("tagIdId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "custom_fields" ADD CONSTRAINT "FK_e71a092bfa62ff9d369abff3b1c" FOREIGN KEY ("collectionIdId") REFERENCES "collections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collection_item_custom_fields" ADD CONSTRAINT "FK_c7a39112cb44006a26a887374c5" FOREIGN KEY ("collectionItemIdId") REFERENCES "collection_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collection_item_custom_fields" ADD CONSTRAINT "FK_f56ea84aac5c67035f84d4459d8" FOREIGN KEY ("customFieldIdId") REFERENCES "custom_fields"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection_item_custom_fields" DROP CONSTRAINT "FK_f56ea84aac5c67035f84d4459d8"`);
        await queryRunner.query(`ALTER TABLE "collection_item_custom_fields" DROP CONSTRAINT "FK_c7a39112cb44006a26a887374c5"`);
        await queryRunner.query(`ALTER TABLE "custom_fields" DROP CONSTRAINT "FK_e71a092bfa62ff9d369abff3b1c"`);
        await queryRunner.query(`ALTER TABLE "collection_item_tags" DROP CONSTRAINT "FK_453a5baf00ac509141644991e3d"`);
        await queryRunner.query(`ALTER TABLE "collection_item_tags" DROP CONSTRAINT "FK_41c930f8ef78d5eee075db78010"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_67efeade3b8abda682d394279a2"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_1735b43a2674692e5620c78d02c"`);
        await queryRunner.query(`ALTER TABLE "collection_items" DROP CONSTRAINT "FK_32e76b676e06b5bb24c68194a78"`);
        await queryRunner.query(`ALTER TABLE "collections" DROP CONSTRAINT "FK_f9aa46fff6f68d76a71d65df6d5"`);
        await queryRunner.query(`DROP TABLE "collection_item_custom_fields"`);
        await queryRunner.query(`DROP TABLE "custom_fields"`);
        await queryRunner.query(`DROP TABLE "collection_item_tags"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d90243459a697eadb8ad56e909"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b22159685b114d104511b537fa"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "likes"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dda83a6f5295a6d7a5cdcc4c67"`);
        await queryRunner.query(`DROP TABLE "collection_items"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_36c2392659f1a83c0e1bb42779"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f90696fbdbcf7b0b040382551e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ed225078e8bf65b448b69105b4"`);
        await queryRunner.query(`DROP TABLE "collections"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
