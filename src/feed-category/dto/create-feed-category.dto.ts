import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFeedCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;
}
