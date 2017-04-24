import Validator from 'validator';
import _ from 'underscore';


export default function loginValidator(data) {
    let errors = {};

    if (data.email !== null && Validator.isEmpty(data.email)) {
        errors.email = 'Dette feltet er påkrevd';
    }

    // data.email !== null  && Validator.isEmail(data.email) funker ikke
    if ( false ) {  
        errors.email = 'Ugyldig epost addresse';
    }

    if (data.password !== null && Validator.isEmpty(data.password)) {
        errors.password = 'Dette feltet er påkrevd';
    }
    return { errors, isValid: _.isEmpty(errors) };
}