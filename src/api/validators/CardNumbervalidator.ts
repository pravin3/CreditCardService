import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'cardnumber', async: false })
export class CardNumbervalidator implements ValidatorConstraintInterface {
  public validate(value: any, args: ValidationArguments): boolean {
    if (/[^0-9-\s]+/.test(value)) {
        return false;
    }
    let nCheck = 0;
    let bEven = false;
    value = value.toString().replace(/\D/g, '');
    if (value.length > 19) {
        return false;
    }
    for (let n = value.length - 1; n >= 0; n--) {
        const cDigit = value.charAt(n);
        let nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9) {
                nDigit -= 9;
            }
        }

        nCheck += nDigit;
        bEven = !bEven;
    }
    return (nCheck % 10) === 0;
  }

  public defaultMessage(args: ValidationArguments): string {
    return 'Invalid Card Number $value';
  }
}
