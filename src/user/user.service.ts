import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PaginationService } from 'src/pagination/pagination_service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    try {
      const passwordHash = await bcrypt.hash(dto.password, 10);
      const user = this.repo.create({ ...dto, passwordHash });
      return await this.repo.save(user);
    } catch (error) {
      throw new ConflictException(error.message);

      throw error;
    }
  }

  findAll(): Promise<User[]> {
    return this.repo.find({ relations: ['orders', 'royaltyPoints'] });
  }
  async findAllPaginated(
    page: number,
    limit: number,
    search?: string,
    sort?: string,
  ) {
    return PaginationService.paginate(this.repo, page, limit, {
      search,
      searchFields: ['name'],
      sort,
      // relations: ['products'],
    });
  }
  async findByEmail(email: string) {
    return await this.repo.findOne({ where: { email } });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.repo.findOne({
      where: { userId: id },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // Handle password separately
    if (dto.password) {
      user.passwordHash = await bcrypt.hash(dto.password, 10);
      delete dto.password; // optional, since we already copied it
    }

    // Merge the rest of the fields into the entity
    Object.assign(user, dto);

    return this.repo.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.repo.remove(user);
  }
}
