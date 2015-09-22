'use strict';
const STATUS_CODES = {
    UNAUTHORIZED: 422, // used for wrong password, etc.
    BAD_REQUEST: 400, // bad params given (missing username)
    INTERNAL_ERROR: 500 // any unexpected error
}
/**
 *  Response class to manage response and status codes
 */
class Response {
    constructor() {
        this.CODES = STATUS_CODES;
    }
    
    /**
     * A wrapper to send errors as a response in the format {error: error}
     */
    sendError(res, code, error) {
        res.statusCode = code;
        res.send({error});
    }
    
    /**
     * A wrapper to send data as a response in the format: {data: data}
     */
    sendData(res, data) {
        res.send({data});
    }
};

module.exports = Response;