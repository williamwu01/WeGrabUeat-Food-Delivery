import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class RegisterDto {
  @Field()
  @IsNotEmpty({ message: 'Name is Required.' })
  @IsString({ message: 'Name must be a String.' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Password is Required.' })
  @MinLength(8, { message: 'Password must be at least 8 characters.' })
  password: string;

  @Field()
  @IsNotEmpty({ message: 'Email is Required.' })
  @IsEmail({}, { message: 'Email must be a valid email.' })
  email: string;

	@Field()
  @IsNotEmpty({ message: 'Phone Number is required.' })
	phone_number: number;
}

@InputType()
export class LoginDto {
	@Field()
  @IsNotEmpty({ message: 'Email is Required.' })
  @IsEmail({}, { message: 'Email must be a valid email.' })
  email: string;

	@Field()
  @IsNotEmpty({ message: 'Password is Required.' })
  password: string;
}
