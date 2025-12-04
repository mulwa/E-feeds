import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateFeedCategoryDto } from './dto/create-feed-category.dto';
import { UpdateFeedCategoryDto } from './dto/update-feed-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {FeedCategory} from './entities/feed-category.entity'
import { PaginationService } from 'src/pagination/pagination_service';

@Injectable()
export class FeedCategoryService {
    constructor(
    @InjectRepository(FeedCategory)
    private readonly categoryRepo: Repository<FeedCategory>,
  ) {}
  async create(dto: CreateFeedCategoryDto): Promise<FeedCategory> {
    const category = this.categoryRepo.create(dto);
    return this.categoryRepo.save(category);
  }

  async findAll(): Promise<FeedCategory[]> {
    return this.categoryRepo.find({ relations: ['products'] });
  }
    async findAllPaginated(
    page: number,
    limit: number,
    search?: string,
    sort?: string,
  ) {
    return PaginationService.paginate(this.categoryRepo, page, limit, {
      search,
      searchFields: ['name'], // searchable fields
      sort,
      relations: ['products'],
    });
  }
   async findOne(id: number): Promise<FeedCategory> {
    const category = await this.categoryRepo.findOne({
      where: { categoryId: id },
      relations: ['products'],
    });

    if (!category) {
      throw new NotFoundException(`Feed category with ID ${id} not found`);
    }

    return category;
  }

  async update(id: number, dto: UpdateFeedCategoryDto): Promise<FeedCategory> {
    const category = await this.findOne(id);
    Object.assign(category, dto);
    return this.categoryRepo.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepo.remove(category);
  }

  

}
