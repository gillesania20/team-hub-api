const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    return res.json('login');
}
export default login;   