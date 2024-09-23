import { BadRequestException} from "@nestjs/common";
import { Resolver, Context, Args, Mutation, Query } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { RegisterResponse } from "./types/user.types";
import { RegisterDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";
import { Response } from 'express';


@Resolver('User')
// @UseFilters
export class UserResolver{
	constructor(
		private readonly userService: UsersService
	){}

	@Mutation(() => RegisterResponse)
	async register(
		@Args('registerInput') registerDto: RegisterDto,
		@Context() context: {res: Response},
	): Promise<RegisterResponse>{
if (!registerDto.name || !registerDto.email || !registerDto.password){
	throw new BadRequestException("please fill the all fields");
}

const user = await this.userService.register(registerDto, context.res);

return { user};
	}

	@Query(() => [User])
	async getUsers(){
		return this.userService.getUsers();
	}

}