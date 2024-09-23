import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegisterDto, LoginDto } from './dto/user.dto';
import { PrismaService } from '../../../prisma/Prisma.service';


import { Response } from 'express';


@Injectable()
export class UsersService {
  constructor(
    private readonly jstService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  //register user
  async register(registerDto: RegisterDto, response: Response ) {
    const { name, email, password } = registerDto;
		const isEmailExist = await this.prisma.user.findUnique({
			where: {email,}
		})

		if(isEmailExist) {
			throw new BadRequestException("user already registered");
		}
    const user = await this.prisma.user.create({
			data: {
				name,
        email,
        password
			}
		})
    return {user, response};
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
		return this.prisma.user.findMany;
	}
}
