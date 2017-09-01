//** Polyglot Commands ***//
const CALL_SERVICE_REQUEST = "CALL_SERVICE_REQUEST";
const CALL_SERVICE_RESPONSE = "CALL_SERVICE_RESPONSE";
//************************//

//** Dragoman Commands ***//

const POST_LOGS = "POST_LOGS";
const LOG_LEVELS = {
    WARN: 'WARN',
    INFO: 'INFO',
    DEBUG: 'DEBUG',
}
// TODO: Define different levels as constants

const CANCEL_REQUEST = "CANCEL_REQUEST";
const CANCEL_REQUEST_RESPONSE = "CANCEL_REQUEST_RESPONSE";
//************************//

module.exports = {
    CALL_SERVICE_REQUEST,
    CALL_SERVICE_RESPONSE,
    POST_LOGS,
    LOG_LEVELS,
    CANCEL_REQUEST,
    CANCEL_REQUEST_RESPONSE
}