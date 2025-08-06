const postLoginService = require("../../services/login/postLogin.service");

const postLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await postLoginService(username, password);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = postLogin;
