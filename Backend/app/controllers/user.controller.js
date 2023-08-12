const jwt = require("jsonwebtoken")
const db = require("../models");
const User = db.users

exports.register = async (req, res) => {
    if (!req.body.name && req.body.email && req.body.password) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    const results = await User.create(user)
    const token = jwt.sign({ results }, "123")
    results.token = token
    await results.save()
    res.send(results);
};

exports.login = async (req, res) => {
    const { email, password } = req.body
    console.log(email, "  ", typeof (password))
    if (email == "" && password == "") {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const user = await User.findOne({ where: { email: email } })
    if (user == null) {
        res.status(404).send({
            message: "Please Registered!"
        });
    }
    else {
        if (password == user.password) {
            const token = { "token": user.token }
            res.send(token)
        }
        else {
            res.status(403).send({
                message: "Wrong password!"
            });
        }
    }
}