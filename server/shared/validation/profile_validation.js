import Validator from 'validator';
import _ from 'underscore';

export default function profileValidator(data) {
    let errors = {};












    return { errors, isValid: _.isEmpty(errors) };
}