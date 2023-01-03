
class ErrorCodeError extends Error {
    /**
     * @param message{string} message
     * @param errorCode{ErrorCode} corresponding error code
     */
    constructor(message, errorCode) {
        super();
        this.message = message;
        this.errorCode = errorCode;
    }
}

/**
 * Handles ErrorCodeErrors, if error is instance of ErrorCodeError, then sends
 * it in the response, otherwise it's internal server error, and sends a 500 response
 * status with empty body
 * @param error{Error} error
 * @param res response
 */
const handleError = (error, res) => {
    console.log(error);
    if (error instanceof ErrorCodeError) {
        res.status(400).send(error);
    } else {
        res.status(500).send(null);
    }
}

const ErrorCode = Object.freeze({
    INCORRECT_PASSWORD: 'INCORRECT_PASSWORD',
    LOGIN_ATTEMPTS_EXCEEDED: 'LOGIN_ATTEMPTS_EXCEEDED',
    USERNAME_NOT_FOUND: 'USERNAME_NOT_FOUND',
    NON_CLOSED_BUGS: 'NON_CLOSED_BUGS',
    EXISTING_BUG: 'EXISTING_BUG',
    BUG_NOT_FOUND: 'BUG_NOT_FOUND',
    NOT_A_FIXED_BUG: 'NOT_A_FIXED_BUG',
    ROLE_NOT_FOUND: 'ROLE_NOT_FOUND',
    ROLE_TITLE_TAKEN: 'ROLE_TITLE_TAKEN',
    PERMISSION_NOT_FOUND: 'PERMISSION_NOT_FOUND',
    PERMISSION_TITLE_TAKEN: 'PERMISSION_TITLE_TAKEN',
    INCORRECT_REQ_BODY: 'INCORRECT_REQ_BODY',
    INCORRECT_REQ_BODY_NAME: 'INCORRECT_REQ_BODY_NAME',
    INCORRECT_REQ_BODY_EMAIL: 'INCORRECT_REQ_BODY_EMAIL',
    INCORRECT_REQ_BODY_PHONE: 'INCORRECT_REQ_BODY_PHONE',
    COULD_NOT_GENERATE_USERNAME: 'COULD_NOT_GENERATE_USERNAME',
    MIN_ONE_ROLE_REQUIRED: 'MIN_ONE_ROLE_REQUIRED',
    INVALID_ROLE_TITLE: 'INVALID_ROLE_TITLE',
});


module.exports = {
    ErrorCodeError, ErrorCode, handleError
}