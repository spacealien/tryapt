import validator from 'validator';
import _ from 'underscore';

export default function emailValidator(data) {
    let errors = {};

    // checks is the email and password is empty
    if (data.email !== null && validator.isEmpty(data.email)) {
        errors = 'Dette feltet er påkrevd';
        return { errors, isValid: _.isEmpty(errors) };
    }

    if( data.email !== null && !validator.isEmail(data.email)) {
        errors = 'Ikke en gyldig epost addresse'
        return { errors, isValid: _.isEmpty(errors) };
    }
}