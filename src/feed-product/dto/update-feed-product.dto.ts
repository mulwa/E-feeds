import { PartialType } from '@nestjs/swagger';
import { CreateFeedProductDto } from './create-feed-product.dto';

export class UpdateFeedProductDto extends PartialType(CreateFeedProductDto) {}
