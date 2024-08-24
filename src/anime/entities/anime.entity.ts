export class Anime {

    id: string;

    title: string;

    img_url: string;

    status: string;



    constructor(partial: Partial<Anime>) {
        Object.assign(this, partial);
    }
}

