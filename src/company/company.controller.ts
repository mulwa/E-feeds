import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/pagination/pagination.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Company' })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
    async findAll(@Req() req, @Query() query: PaginationQueryDto) {
      console.log('Authorization header:', req.headers.authorization);
      console.log(req.user);
      const page = query.page ?? 1;
      const limit = query.limit ?? 10;
      return this.companyService.findAllPaginated(
        page,
        limit,
        query.search,
        query.sort,
      );
    }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
