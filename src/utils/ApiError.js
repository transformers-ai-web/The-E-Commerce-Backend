class CustomApiError extends Error{
    constructor(statusCode, message = "Encountered an error.", errors = []){
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.success = false
        this.errors = errors
    }
}

//not capturing the stack trace as of now, will do that as need arises. Also this.data = null(let's see if this is reqd)

export { CustomApiError }