const getCookie = (req, res) => {
    const acceptsCookies = req.cookies.acceptsCookies;
    let response = null;
    if(typeof acceptsCookies === 'undefined'){
        response = {
            status: 200,
            message: 'cookie not found'
        }
    }else{
        response = {
            status: 200,
            message: 'cookie found'
        }
    }
    return res.status(response.status).json({message: response.message})
}
export default getCookie;