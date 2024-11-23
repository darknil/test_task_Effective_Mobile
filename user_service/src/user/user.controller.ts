import { Get, Post, Put, Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return {
      count: users.length,
      users,
    };
  }
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Put('update-problems')
  async updateHasProblemsFlag() {
    const countBefore = await this.userService.updateHasProblemsFlag();
    return {
      count: countBefore,
      message: `Successfully updated the 'hasProblems' flag. ${countBefore} users had the flag set to true.`,
    };
  }
}
