import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoyaltyPointService } from './royalty-point.service';
import { CreateRoyaltyPointDto } from './dto/create-royalty-point.dto';
import { UpdateRoyaltyPointDto } from './dto/update-royalty-point.dto';

@Controller('royalty-point')
export class RoyaltyPointController {
  constructor(private readonly royaltyPointService: RoyaltyPointService) {}

  @Post()
  create(@Body() createRoyaltyPointDto: CreateRoyaltyPointDto) {
    return this.royaltyPointService.create(createRoyaltyPointDto);
  }

  @Get()
  findAll() {
    return this.royaltyPointService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.royaltyPointService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoyaltyPointDto: UpdateRoyaltyPointDto) {
    return this.royaltyPointService.update(+id, updateRoyaltyPointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.royaltyPointService.remove(+id);
  }
}
