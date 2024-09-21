import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegisterDto, LoginDto } from './dto/user.dto';
// import { Response } from 'express';


@Injectable()
export class UsersService {
  constructor(
    private readonly jstService: JwtService,
    // private readonly prisma:
    private readonly configService: ConfigService,
  ) {}

  //register user
  async register(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;
    const user = {
      name,
      email,
      password,
    };
    return user;
  }

  //login service
	async login(loginDto: LoginDto) {
		const { email, password } = loginDto;
		const user = {
			email,
			password,
		};
		return user;
	}

	//get all user sevice 
	async getUsers(){
		const user = [
			{ id: 1, name: 'John Doe', email: 'john.doe@example.com', password: '1234567F'  },
      //... more users...
		];
		return user;
	}
}
