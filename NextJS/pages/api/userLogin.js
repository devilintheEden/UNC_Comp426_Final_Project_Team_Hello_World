import { User } from "../../helper_scripts/DB_helper.js";
const mongoose = require("mongoose");

export default async (req, res) => {
    return new Promise((resolve) => {
        try {
            if (req.method === "POST") {
                let data = req.body;
                if (new Date() - new Date(data.timeStamp) < 1000) {
                    mongoose.connect("mongodb://localhost/test", {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    });
                    const db = mongoose.connection;
                    db.on(
                        "error",
                        console.error.bind(console, "connection error:")
                    );
                    if (data.password) {
                        db.once("open", async function () {
                            User.findOne(
                                { email: data.email, password: data.password },
                                async function (err, result) {
                                    if (err) return console.error(err);
                                    if (result) {
                                        db.close();
                                        if (result.verify.verified) {
                                            res.status(200).json({
                                                uid: result.uid,
                                                verified: true,
                                            });
                                        } else {
                                            res.status(200).json({
                                                uid: result.uid,
                                                verified: false,
                                            });
                                        }
                                        return resolve();
                                    } else {
                                        res.status(200).json({
                                            message:
                                                "The password is incorrect.",
                                        });
                                        return resolve();
                                    }
                                }
                            );
                        });
                    } else {
                        db.once("open", async function () {
                            let temp_date = new Date().getTime() - 43200000;
                            User.findOneAndDelete(
                                {
                                    email: data.email,
                                    "verify.verified": false,
                                    user_init_time: {
                                        $lt: temp_date,
                                    },
                                },
                                async function (err) {
                                    if (err) return console.error(err);
                                    User.findOne(
                                        { email: data.email },
                                        async function (err, result) {
                                            if (err) return console.error(err);
                                            if (!result) {
                                                db.close();
                                                res.status(200).json({
                                                    message:
                                                        "The account doesn't exist.",
                                                });
                                                return resolve();
                                            } else {
                                                db.close();
                                                res.status(200).json({
                                                    salt: result.salt,
                                                });
                                                return resolve();
                                            }
                                        }
                                    );
                                }
                            );
                        });
                    }
                } else {
                    throw String("timeout");
                }
            } else {
                throw String("Method not allowed");
            }
        } catch (error) {
            res.status(400).json({ message: JSON.stringify(error, null, 2) });
            return resolve();
        }
    });
};
