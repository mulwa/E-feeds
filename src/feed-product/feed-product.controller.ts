import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FeedProductService } from './feed-product.service';
import { CreateFeedProductDto } from './dto/create-feed-product.dto';
import { UpdateFeedProductDto } from './dto/update-feed-product.dto';
import { PaginationQueryDto } from 'src/pagination/pagination.dto';

@Controller('feed-product')
export class FeedProductController {
  constructor(private readonly feedProductService: FeedProductService) {}

  @Post()
  create(@Body() createFeedProductDto: CreateFeedProductDto) {
    return this.feedProductService.create(createFeedProductDto);
  }

  // @Get()
  // findAll() {
  //   return this.feedProductService.findAll();
  // }
  @Get()
  async findAll(@Query() query: PaginationQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    return this.feedProductService.findAllPaginated(
      page,
      limit,
      query.search,
      query.sort,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedProductService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFeedProductDto: UpdateFeedProductDto,
  ) {
    return this.feedProductService.update(+id, updateFeedProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedProductService.remove(+id);
  }
}
