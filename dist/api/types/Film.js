"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Film = void 0;
const tslib_1 = require("tslib");
const type_graphql_1 = require("type-graphql");
class Film {
}
tslib_1.__decorate([
    type_graphql_1.Field({
        description: 'The first name of the user.',
    }),
    tslib_1.__metadata("design:type", String)
], Film.prototype, "firstName", void 0);
tslib_1.__decorate([
    type_graphql_1.Field({
        description: 'The last name of the user.',
    }),
    tslib_1.__metadata("design:type", String)
], Film.prototype, "lastName", void 0);
tslib_1.__decorate([
    type_graphql_1.Field({
        description: 'The email of the user.',
    }),
    tslib_1.__metadata("design:type", String)
], Film.prototype, "email", void 0);
exports.Film = Film;
//# sourceMappingURL=Film.js.map