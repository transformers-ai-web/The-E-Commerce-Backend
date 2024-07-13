//will understand this and such other syntaxes, by doing a bit of dsa and cp in js. Right now syntax is weird.
const asyncHandler = (requestHandler) => {
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)
    .catch((err) => next(err))
        )
    }
}
    
export { asyncHandler }