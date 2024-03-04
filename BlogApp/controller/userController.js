const User = require('../model/userSchema');
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const user = new User({ firstName, lastName, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        req.session.userId = user._id;
        res.json({ message: 'User logged in successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const logOut = async (req, res) => {
    try{
        req.session.destroy();
        res.json({ message: 'User logged out successfully' });
    }catch(err){
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getAllUsers, register, login, logOut };