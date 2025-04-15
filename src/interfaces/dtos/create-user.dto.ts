import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Christian Possidonio' }) name: string;
  @ApiProperty({ example: 'possidonio.ch@gmail.com' }) email: string;
}
