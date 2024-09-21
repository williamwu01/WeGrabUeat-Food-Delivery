import { BadRequestException } from "@nestjs/common";
import { Resolver, Args, Mutation } from "@nestjs/graphql";
import { RegisterResponse } from "./types/user.types";
import { RegisterDto } from "./dto/user.dto";
import { UsersService } from "./users.service";



@Resolver('User')
// @UseFilters
export class UserResolver{
	constructor(
		private readonly userService: UsersService
	){}

	@Mutation(() => RegisterResponse)
	async register(
		@Args('registerInput') registerDto: RegisterDto,
	
	): Promise<RegisterResponse>{
if (!registerDto.name || !registerDto.email || !registerDto.password){
	throw new BadRequestException("please fill the all fields");
}

const user = await this.userService.register(registerDto);

return { user};
	}
}