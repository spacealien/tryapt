import Validator from 'validator';
import _ from 'underscore';

export default function resetPasswordValidation(data) {
    let errors = {};

    if (data.password !== null && Validator.isEmpty(data.password)) {
        errors.password = 'Dette feltet er påkrevd';
    }

    if (data.passwordConfirm !== null && Validator.isEmpty(data.password)) {
        errors.password = 'Dette feltet er påkrevd';
    }
    
    if ( false ) {  
        errors.email = 'Ugyldig epost addresse';
    }

    return { errors, isValid: _.isEmpty(errors) };
}