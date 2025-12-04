import { Injectable } from '@nestjs/common';
import { CreateRoyaltyPointDto } from './dto/create-royalty-point.dto';
import { UpdateRoyaltyPointDto } from './dto/update-royalty-point.dto';

@Injectable()
export class RoyaltyPointService {
  create(createRoyaltyPointDto: CreateRoyaltyPointDto) {
    return 'This action adds a new royaltyPoint';
  }

  findAll() {
    return `This action returns all royaltyPoint`;
  }

  findOne(id: number) {
    return `This action returns a #${id} royaltyPoint`;
  }

  update(id: number, updateRoyaltyPointDto: UpdateRoyaltyPointDto) {
    return `This action updates a #${id} royaltyPoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} royaltyPoint`;
  }
}
