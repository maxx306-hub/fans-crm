import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/add-user/')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get-user/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

}
