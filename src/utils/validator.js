const validator = require('validator');

const validateSignUpRequest = (body) => {
    if(!body || typeof body !== 'object') {
        throw new Error("Invalid request body");
    }
    
    const {firstname, lastname, password, email} = body;
    
    if(!firstname || firstname.trim().length === 0) {
        throw new Error("Please enter a valid first name");
    }
    if(!lastname || lastname.trim().length === 0) {
        throw new Error("Please enter a valid last name");
    }
    if(!email || !validator.isEmail(email)){
        throw new Error("Please enter a valid email");
    }
    if(!password || !validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password");
    }
};

const validateLoginRequest = (body) => {
    if(!body || typeof body !== 'object') {
        throw new Error("Invalid request body");
    }

    const {email, password} = body;

    if(!email || !validator.isEmail(email)){
        throw new Error("Please enter a valid email");
    }
    if(!password || password.length < 3){
        throw new Error("Please enter a valid password");
    }
}

const validateProfileReq = (body) => {
    if(!body || typeof body !== 'object'){
        throw new Error("Not a valid request");
    }
    if(!body.email || !validator.isEmail(body.email)){
        throw new Error("Not a valid email");
    }
}

module.exports = {validateSignUpRequest, validateLoginRequest, validateProfileReq};