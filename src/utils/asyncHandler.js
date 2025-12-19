const asyncHandler = (reqestHandler) => {
    () => {
        Promise.resolve(requestHandler(req, res, next)).
        catch((err) => next(err))
    }
}

export{asyncHandler}