import { IsNotEmpty, IsString } from "class-validator"

export class CreateEpisodeDto {
    /**
     * @example'https://cdn.myanimelist.net/images/anime/10/78745.jpg'
     * @description The image of the episode
     */

    @IsString()
    readonly img_episode: string

    /**
     * @example'https://jk-anime.com/episode/1'
     * @description The url of the episode
     */

    @IsString()
    @IsNotEmpty()
    readonly url_episode: string

    /**
     * @example'Capitulo 1'
     * @description The capitule of the episode
     */

    @IsString()
    @IsNotEmpty()
    readonly numeber_episode: string
}
