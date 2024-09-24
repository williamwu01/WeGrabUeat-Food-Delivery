import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegisterDto, LoginDto } from './dto/user.dto';
import { PrismaService } from '../../../prisma/Prisma.service';
import { Response } from 'express';
import * as bcrpt from 'bcrypt';

interface UserData {
	name: string;
	email: string;
	password: string;
	phone_number: number;
}


@Injectable()
export class UsersService {
  constructor(
    private readonly jstService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  //register user
  async register(registerDto: RegisterDto, response: Response ) {
    const { name, email, password, phone_number } = registerDto;

		const isEmailExist = await this.prisma.user.findUnique({
			where: {
				email,
			},
		})

		if(isEmailExist) {
			throw new BadRequestException("user already registered");
		}

		const isPhoneNumberExist = await this.prisma.user.findUnique({
			where: {
				phone_number,
			},
		});

		if(isPhoneNumberExist) {
      throw new BadRequestException("phone number already registered");
    }

		const hashedPassword = await bcrpt.hash(password, 10);

    const user = {

				name,
        email,
        password: hashedPassword,
				phone_number,
			};

			const activationToken = await this.createActivationToken(user);

			const activationCode = activationToken.activationCode;

			console.log(activationCode);
    return {user, response};
  }

	//create activation token
	async createActivationToken(user: UserData) {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

		const token = this.jstService.sign(
			{
				user,
				activationCode,
			},
			{
				secret: this.configService.get<string>('ACTIVATION_SECRET'),
				expiresIn: '5m',
			},
		);
		return { token, activationCode};
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
