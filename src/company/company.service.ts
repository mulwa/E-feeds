import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {}
  async create(dto: CreateCompanyDto): Promise<Company> {
    const company = this.companyRepo.create(dto);
    return this.companyRepo.save(company);
  }
  async findAll(): Promise<Company[]> {
    return this.companyRepo.find({ relations: ['products'] });
  }
  async findOne(id: number): Promise<Company> {
    const company = await this.companyRepo.findOne({
      where: { companyId: id },
      relations: ['products'],
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return company;
  }
  async update(id: number, dto: UpdateCompanyDto): Promise<Company> {
    const company = await this.findOne(id);
    Object.assign(company, dto);
    return this.companyRepo.save(company);
  }

  async remove(id: number): Promise<void> {
    const company = await this.findOne(id);
    await this.companyRepo.remove(company);
  }
}
