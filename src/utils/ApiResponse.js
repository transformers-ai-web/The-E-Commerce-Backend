class CustomApiResponse {
    constructor(statusCode, message, data){
        this.statusCode = this.statusCode
        this.success = statusCode < 400
        this.message = message
        this.data = data
    }
}

export { CustomApiResponse }