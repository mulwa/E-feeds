import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedProductDto } from './dto/create-feed-product.dto';
import { UpdateFeedProductDto } from './dto/update-feed-product.dto';
import { Company } from '../company/entities/company.entity';
import { FeedCategory } from '../feed-category/entities/feed-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedProduct } from './entities/feed-product.entity';

@Injectable()
export class FeedProductService {
  constructor(
    @InjectRepository(FeedProduct)
    private readonly productRepo: Repository<FeedProduct>,

    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,

    @InjectRepository(FeedCategory)
    private readonly categoryRepo: Repository<FeedCategory>,
  ) {}
  async create(dto: CreateFeedProductDto): Promise<FeedProduct> {
    const company = await this.companyRepo.findOne({
      where: { companyId: dto.companyId },
    });

    if (!company) {
      throw new NotFoundException(`Company ${dto.companyId} not found`);
    }

    const category = await this.categoryRepo.findOne({
      where: { categoryId: dto.categoryId },
    });

    if (!category) {
      throw new NotFoundException(`Category ${dto.categoryId} not found`);
    }

    const product = this.productRepo.create({
      productName: dto.productName,
      description: dto.description,
      price: dto.price,
      company,
      category,
    });

    return this.productRepo.save(product);
  }

  async findAll(): Promise<FeedProduct[]> {
    return this.productRepo.find({
      relations: ['company', 'category'],
    });
  }

  async findOne(id: number): Promise<FeedProduct> {
    const product = await this.productRepo.findOne({
      where: { productId: id },
      relations: ['company', 'category'],
    });

    if (!product) {
      throw new NotFoundException(`FeedProduct ${id} not found`);
    }

    return product;
  }

 async update(id: number, dto: UpdateFeedProductDto): Promise<FeedProduct> {
  const product = await this.findOne(id);

  if (dto.companyId) {
    const company = await this.companyRepo.findOneBy({
      companyId: dto.companyId,
    });

    if (!company) {
      throw new NotFoundException(`Company ${dto.companyId} not found`);
    }

    product.company = company;
  }

  if (dto.categoryId) {
    const category = await this.categoryRepo.findOneBy({
      categoryId: dto.categoryId,
    });

    if (!category) {
      throw new NotFoundException(`Category ${dto.categoryId} not found`);
    }

    product.category = category;
  }

  // Always merge the rest of the dto
  Object.assign(product, dto);

  // Always return saved entity
  return this.productRepo.save(product);
}


  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepo.remove(product);
  }
}
