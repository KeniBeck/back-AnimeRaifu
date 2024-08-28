import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnimeDto {

    /**
     * @example'Akame ga Kill'
     * @description The title of the anime
     */
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    /**
     * @example'https://www.jkanime.net/akame-ga-kill?img_url=www.example.com'
     * @description The url of the image anime
     */
    @IsString()
    @IsNotEmpty()
    readonly img_url: string;


    /**
     * @example'https://www.jkanime.net/akame-ga-kill'
     * @description'The url of the anime'
     */
    readonly banner_url: string

    /**
     * @example'Concluido'
     * @description The status of the anime
     */
    @IsString()
    @IsNotEmpty()
    readonly emission: string;


    /**
     * @example'En un mundo medieval, la joven Akame se une a un grupo de asesinos llamado Night Raid para vengar la muerte de su amigo y acabar con la corrupción del Imperio.'
     * @description The sinopsis of the anime
     */
    @IsString()
    @IsNotEmpty()
    readonly sinopsis: string;

    /**
     * @example'2014'
     * @description The year of the anime
     */

    @IsNotEmpty()
    @IsString()
    readonly year: string;

    /**
     * @example'TV'
     * @description The type of the anime
     */

    @IsString()
    @IsNotEmpty()
    readonly type: string;

}
