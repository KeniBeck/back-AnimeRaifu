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
    readonly Emision: boolean;

}
