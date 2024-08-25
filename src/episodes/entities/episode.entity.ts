export class Episode {
    id: number;
    img_episode: string;
    url_episode: string;
    numeber_episode: string;

    constructor(partial: Partial<Episode>) {
        Object.assign(this, partial);
    }
}
