class errorHandler extends Error{
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static notFound(message) {
        return new errorHandler(404, "404 " + message);
    }

    static internalServer(message) {
        return new errorHandler(500, "500 " + message);
    }

    static forbidden(message) {
        return new errorHandler(403, "403 " + message);
    }

    static succeed(message) {
        return new errorHandler(200, "200 " + message);
    }
}

module.exports = errorHandler;