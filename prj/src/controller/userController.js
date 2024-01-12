const userModel = require('../model/userModel');
const jwt = require('../services/token');
const bcrypt = require('bcrypt')

module.exports.signup = async (req, res) => {
    try {
        let { email, password } = req.body
        const findUser = await userModel.findOne({ email: email })
        if (findUser) {
            return res.status(400).json({
                message: 'User already exist'
            })
        } else {
            password = await bcrypt.hash(password, 10);
            const newUser = await userModel.create({ email: email, password: password })
            if (newUser) {
                return res.status(201).json({
                    message: 'User Created Successfully',
                    data: newUser.email
                })
            } else {
                return res.status(400).json({
                    message: 'Error creating user'
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let checkUser = await userModel.findOne({ email: email })
        if (checkUser) {
            let checkPassword = await bcrypt.compare(password, checkUser.password);
            if (checkPassword) {
                let payload = {
                    id: checkUser._id,
                    email: checkUser.email,
                };
                let token = await jwt.issueJWT(payload);
                res.status(200).json({
                    message: "User Login Successfully.",
                    token: token,
                    data: {
                        user_id: checkUser._id,
                        email: checkUser.email,
                    },
                });
            }
            else {
                res.status(400).json({
                    message: "You Entered A Wrong Password.",
                });
            }
        }
        else {
            res.status(404).json({
                message: "This User Does Not Exist.",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Internal Server Error: ${error.message}`,
        });
    }
};
