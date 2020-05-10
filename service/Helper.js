const ErrorMessage = require("./ErrorMessage");

module.exports.getPromiseForQuery = function (query, id) {
    return new Promise(async function (resolve, reject) {
        if (Number.isInteger(id)) {
            let result = await query;
            if (Object.keys(result).length > 0) {
                resolve(result);
            } else {
                const code = 404
                const message = "No result for given id"
                reject(new ErrorMessage(code, message))
            }
        } else {
            const code = 400
            const message = "Bad request"
            reject(new ErrorMessage(code, message))
        }
    });
}
