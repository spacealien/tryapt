import Validator from 'validator';
import _ from 'underscore';

export default function profileValidator(data) {
    let errors = {};

    // checks is the email and password is empty
    if (data.linked !== null && Validator.isEmpty(data.email)) {
        errors.email = 'Dette feltet er påkrevd';
    }

    // checks is the email and password is empty
    if (data.experience !== null && Validator.isEmpty(data.email)) {
        errors.email = 'Dette feltet er påkrevd';
    }

    return { errors, isValid: _.isEmpty(errors) };
}