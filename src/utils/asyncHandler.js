// const asyncHandler=(fn) => async (req , res, next) => {
//     try {
//         await fn(req, res, next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message:error.message
//         })
//     }
// };

const asyncHandler = ( RequestHandler ) => {
    return (req , res, next) => {
        Promise.resolve(RequestHandler(req, res, next)).catch(error =>next(error))
    }
}


export { asyncHandler}