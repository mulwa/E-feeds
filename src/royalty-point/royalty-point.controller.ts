import { Controller, Get, UseGuards, Req, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoyaltyPointService } from './royalty-point.service';
import { PaginationQueryDto } from 'src/pagination/pagination.dto';

@ApiTags('Royalty Points')
@ApiBearerAuth()
@Controller('royalty')
export class RoyaltyPointController {
  constructor(private readonly royaltyService: RoyaltyPointService) {}

  @UseGuards(JwtAuthGuard)
  @Get('my')
  @ApiOperation({ summary: 'Get my royalty points history' })
  @ApiResponse({ status: 200, description: 'Royalty history returned' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getMyRoyalties(@Req() req,@Query() query: PaginationQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 100;
    return this.royaltyService.findMyRoyalties(req.user.userId,page,limit);
  }

  // ✅ Get my total royalty points
  @UseGuards(JwtAuthGuard)
  @Get('my/total')
  @ApiOperation({ summary: 'Get my total royalty points' })
  @ApiResponse({ status: 200, description: 'Total royalty points returned' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getMyTotal(@Req() req) {
    return this.royaltyService.getUserTotal(req.user.userId);
  }

  // ✅ Admin: get all royalty records
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all royalty records (Admin)' })
  @ApiResponse({ status: 200, description: 'All royalty records returned' })
  findAll() {
    return this.royaltyService.findAll();
  }

  // ✅ Admin: get total points for a specific user
  @UseGuards(JwtAuthGuard)
  @Get('user/:id/total')
  @ApiOperation({ summary: 'Get total royalty points for a specific user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User total points returned' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUserTotal(@Param('id') id: number) {
    return this.royaltyService.getUserTotal(id);
  }
}
