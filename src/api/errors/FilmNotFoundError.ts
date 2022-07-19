import { HttpError } from 'routing-controllers';

export class FilmNotFoundError extends HttpError {
    constructor() {
        super(404, 'Film not found!');
    }
}
