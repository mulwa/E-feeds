import { Module } from '@nestjs/common';
import { FeedCategoryService } from './feed-category.service';
import { FeedCategoryController } from './feed-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {FeedCategory} from './entities/feed-category.entity'


@Module({
    imports: [TypeOrmModule.forFeature([FeedCategory])],
  controllers: [FeedCategoryController],
  providers: [FeedCategoryService],
  exports: [TypeOrmModule]
})
export class FeedCategoryModule {}
