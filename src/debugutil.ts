const debug = true;

function log(message?: any, ...optionalParams: any[]) {
    if (debug) {
        console.log(message, optionalParams);
    }
}