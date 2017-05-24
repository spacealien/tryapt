import Validator from 'validator';
import _ from 'underscore';

// new password validator
export default function resetPasswordValidation(data) {
    let errors = {};

    if (data.password !== null && Validator.isEmpty(data.password)) {
        errors.password = 'Dette feltet er påkrevd';
    }

    if (data.passwordConfirm !== null && Validator.isEmpty(data.passwordConfirm)) {
        errors.passwordConfirm = 'Dette feltet er påkrevd';
    }

    // checks is password length is less than 8 characters
    if (data.passwordConfirm.length < 8) {
        
        errors.passwordConfirm = 'Passord må være på minst 8 tegn';
    }

    if (data.password.length < 8) {
        
        errors.password = 'Passord må være på minst 8 tegn';
    }

    // checks if password is matching
    if (data.password !== data.passwordConfirm) {
        errors.message = 'Passordene må matche';
    }

    return { errors, isValid: _.isEmpty(errors) };
}