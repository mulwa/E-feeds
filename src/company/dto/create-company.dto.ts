// src/company/dto/create-company.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ description: 'Company name', example: 'Fugo' })
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;
}
