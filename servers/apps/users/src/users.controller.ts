import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // Optionally specify the route prefix
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return this.usersService.getUsers(); // Call the existing method
  }
}
