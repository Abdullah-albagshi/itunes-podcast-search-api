import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class SearchPodcastDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  query: string;
} 