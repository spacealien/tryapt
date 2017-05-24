import Validator from 'validator';
import _ from 'underscore';

export default function loginValidator(data) {
    let errors = {};

    // checks is the email and password is empty
    if (data.email !== null && Validator.isEmpty(data.email)) {
        errors.email = 'Dette feltet er påkrevd';
    }

    // checks is the email and password is empty
    if (data.password !== null && Validator.isEmpty(data.password)) {
        errors.password = 'Dette feltet er påkrevd';
    }
    
    return { errors, isValid: _.isEmpty(errors) };
}