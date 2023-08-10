const errorHandler = (err, req, res, next) => {
    let response = null;
    (process.env.NODE_ENV !== 'production')?(console.log(err.stack)):'';
    if(err.message === 'jwt expired'){
        response = {
            status: 400,
            message: 'jwt expired'
        }
    }else{
        response = {
            status: 400,
            message: 'error'
        }
    }
    return res.status(response.status).json({message: response.message});
}
export default errorHandler;