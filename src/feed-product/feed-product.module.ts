import { Module } from '@nestjs/common';
import { FeedProductService } from './feed-product.service';
import { FeedProductController } from './feed-product.controller';
import {FeedProduct} from './entities/feed-product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from '../company/company.module';
import { FeedCategoryModule } from '../feed-category/feed-category.module';


@Module({
  imports: [TypeOrmModule.forFeature([FeedProduct]),
  CompanyModule,          
    FeedCategoryModule ],
  controllers: [FeedProductController],
  providers: [FeedProductService],
  
})
export class FeedProductModule {}
