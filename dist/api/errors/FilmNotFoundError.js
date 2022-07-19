"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmNotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class FilmNotFoundError extends routing_controllers_1.HttpError {
    constructor() {
        super(404, 'Film not found!');
    }
}
exports.FilmNotFoundError = FilmNotFoundError;
//# sourceMappingURL=FilmNotFoundError.js.map