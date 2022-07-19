import { IsNotEmpty, IsInt , Validate } from 'class-validator';
import { Column, Entity, PrimaryColumn, ObjectIdColumn, ObjectID, Index } from 'typeorm';
import { CardNumbervalidator} from '../validators/CardNumbervalidator';
@Entity()
export class CreditCard {

    @ObjectIdColumn()
    public _id: ObjectID | string;

    @PrimaryColumn()
    public id: string;

    @IsNotEmpty()
    @Column()
    public name: string;

    @IsNotEmpty()
    @Validate(CardNumbervalidator)
    @IsInt()
    @Column()
    @Index({unique : true})
    public cardnumber: number;

    @IsNotEmpty()
    @IsInt()
    @Column()
    public limit: number;

    @Column()
    public createAt: number;

    @Column()
    public updateAt: number;
}
