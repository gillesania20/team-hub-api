const logout = (req, res) => {
    res.clearCookie('jwt');
    return res.status(200).json({message: 'logout successful'});
}
export default logout;