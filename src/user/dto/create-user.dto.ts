import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    /**
     * @example 'John Doe'
     * @description The name of the user
     */
    readonly name: string;

    /**
     * @example 'username'
     * @description The username of the user
     */
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    /**
     * @example 'password123'
     */
    @IsString()
    @IsNotEmpty()
    readonly password: string;

    /**
     * @example 'email@gmail.com'
     * @description The email of the user
     */

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    /**
     * @example '1999-01-01'
     * @description The date of birth of the user
     */

    @IsDate()
    @IsNotEmpty()
    readonly fecha_nacimiento: string;
}
