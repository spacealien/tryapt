import Validator from 'validator';
import _ from 'underscore';


export default function loginValidator(data) {
    let errors = {};

    if (data.password !== null && Validator.isEmpty(data.password)) {
        errors.email = 'Dette feltet er påkrevd';
    }

    if (data.passwordConfirm !== null && Validator.isEmpty(data.passwordConfirm)) {
        errors.password = 'Dette feltet er påkrevd';
    }

    if( data.password !== data.passwordConfirm) {
        erros.matching = "Passordene må matche hverandre";
    }

    return { errors, isValid: _.isEmpty(errors) };
}