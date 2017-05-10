import Validator from 'validator';
import _ from 'underscore';

export default function emailValidator(data) {
    let errors = {};

    // checks is the email and password is empty
    if (data.email !== null && Validator.isEmpty(data.email)) {
        errors.email = 'Dette feltet er påkrevd';
    }

    return { errors, isValid: _.isEmpty(errors) };
}