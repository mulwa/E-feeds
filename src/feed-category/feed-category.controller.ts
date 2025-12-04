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
import { FeedCategoryService } from './feed-category.service';
import { CreateFeedCategoryDto } from './dto/create-feed-category.dto';
import { UpdateFeedCategoryDto } from './dto/update-feed-category.dto';
import { PaginationQueryDto } from 'src/pagination/pagination.dto';
import { PaginationService } from 'src/pagination/pagination_service';

@Controller('feed-category')
export class FeedCategoryController {
  constructor(private readonly feedCategoryService: FeedCategoryService) {}

  @Post()
  create(@Body() createFeedCategoryDto: CreateFeedCategoryDto) {
    return this.feedCategoryService.create(createFeedCategoryDto);
  }

  // @Get()
  // findAll(@Query() query: PaginationQueryDto) {
  //   return this.feedCategoryService.findAll();
  // }
  @Get()
  async findAll(@Query() query: PaginationQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    return this.feedCategoryService.findAllPaginated(
      page,
      limit,
      query.search,
      query.sort,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFeedCategoryDto: UpdateFeedCategoryDto,
  ) {
    return this.feedCategoryService.update(+id, updateFeedCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedCategoryService.remove(+id);
  }
}
