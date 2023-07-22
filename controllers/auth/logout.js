const logout = (req, res) => {
    res.clearCookie('jwt');
    return res.status(200).json('logout successful');
}
export default logout;