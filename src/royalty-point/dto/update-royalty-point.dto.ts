import { PartialType } from '@nestjs/swagger';
import { CreateRoyaltyPointDto } from './create-royalty-point.dto';

export class UpdateRoyaltyPointDto extends PartialType(CreateRoyaltyPointDto) {}
