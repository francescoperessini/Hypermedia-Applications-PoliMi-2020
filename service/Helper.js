const {respondWithCode} = require("../utils/writer");

const ErrorMessage = require("./ErrorMessage");

module.exports.getPromiseForQuery = function (query, id, message, array = true) {
    return new Promise(async function (resolve, reject) {
        if (Number.isInteger(id)) {
            let result = await query;
            if (Object.keys(result).length > 0) {
                if (array) {
                    resolve(result)
                } else {
                    resolve(result[Object.keys(result)[0]])
                }
            } else {
                reject(respondWithCode(404, new ErrorMessage(404, message)))
            }
        } else {
            reject(respondWithCode(400, new ErrorMessage(400, message)))
        }
    });
}
