const bcrypt = require('bcrypt');
const UserModel = require('../models/users.model');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {

    try {
        const requestBody = req.body;

        // hashing the password
        bcrypt.hash(requestBody.password, Number(process.env.SALT), async function (err, hash) {

            if (err) {
                res.status(400).json({error: true, message: err.message});
            } else {
                requestBody.password = hash;

                // saving image path
                if (req.file) {
                    requestBody.image = req.file.filename;
                }

                const user = new UserModel(requestBody);
                user.save().then((userCreated) => {
                    res.status(200).json({
                        error: false,
                        message: 'A new user is created successfully.',
                        data: userCreated
                    });
                })
                    .catch((err) => {
                        res.status(400).json({
                            error: true,
                            message: err.message
                        });
                    });

            }

        });

    } catch (exception) {
        res.status(400).json({error: true, message: exception.message});
    }

};

exports.login = async (req, res, next) => {

    try {
        const requestBody = req.body;

        const found = await UserModel.findOne({email: requestBody.email, isActive: true, isDeleted: false}).lean();

        if (found) {

            // comparing passwords
            bcrypt.compare(requestBody.password, found.password, (err, result) => {

                if (result) {

                    let token = jwt.sign({
                        name: `${found.firstName} ${found.lastName}`,
                        email: found.email,
                        _id: found._id
                    }, process.env.SECRET_KEY, {expiresIn: process.env.EXPIRY});

                    const responseBack = {...found};
                    delete responseBack.password;
                    responseBack.token = token;

                    res.status(200).json({
                        error: false,
                        message: 'You are logged in successfully.',
                        data: responseBack
                    });

                } else {
                    res.status(404).json({error: true, message: 'The password is incorrect.'});
                }

            });

        } else {
            res.status(404).json({error: true, message: 'No user exists against this email address.'});
        }

    } catch (exception) {
        res.status(400).json({error: true, message: exception.message});
    }

};

exports.getProfile = (req, res, next) => {

    try {

        const token = req.headers['access-token'];

        const tokenData = jwt.verify(token, process.env.SECRET_KEY);

        res.status(200).json({error: false, message: 'Access granted.', data: {name: tokenData.name}});


    } catch (exception) {
        res.status(400).json({error: true, message: exception.message});
    }

};
