import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoyaltyPoint } from './entities/royalty-point.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class RoyaltyPointService {
  constructor(
    @InjectRepository(RoyaltyPoint)
    private royaltyRepo: Repository<RoyaltyPoint>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findMyRoyalties(userId: number) {
    return this.royaltyRepo.find({
      where: { user: { userId } },
      relations: ['order'],
      order: { createdAt: 'DESC' },
    });
  }

  async getUserTotal(userId: number) {
    const user = await this.userRepo.findOne({
      where: { userId },
      relations: ['royaltyPoints'],
    });

    if (!user) throw new NotFoundException('User not found');

    const total = user.royaltyPoints.reduce(
      (sum, r) => sum + r.pointsEarned,
      0,
    );

    return {
      userId,
      totalPoints: total,
    };
  }

  async findAll() {
    return this.royaltyRepo.find({
      relations: ['user', 'order'],
      order: { createdAt: 'DESC' },
    });
  }
}
