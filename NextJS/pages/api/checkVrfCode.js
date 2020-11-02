const mongoose = require("mongoose");
import { User } from "../../helper_scripts/DB_helper.js";
import cryptoRandomString from "crypto-random-string";
import { sendEmail } from "../../helper_scripts/email.js";

export default (req, res) => {
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
                    db.once("open", async function () {
                        let temp_date = new Date().getTime() - 43200000;
                        User.findOneAndDelete(
                            {
                                uid: data.uid,
                                "verify.verified": false,
                                user_init_time: {
                                    $lt: temp_date,
                                },
                            },
                            async function (err) {
                                if (err) return console.error(err);
                                if (data.code) {
                                    User.findOneAndUpdate(
                                        {
                                            uid: data.uid,
                                            "verify.verify_code": data.code,
                                        },
                                        { "verify.verified": true },
                                        function (err, result) {
                                            if (err) return console.error(err);
                                            if (!result) {
                                                db.close();
                                                res.status(200).json({
                                                    message:
                                                        "The code is not correct or it has expired.",
                                                });
                                                return resolve();
                                            } else {
                                                db.close();
                                                res.status(200).json({
                                                    message: "",
                                                });
                                                return resolve();
                                            }
                                        }
                                    );
                                } else {
                                    console.log("1");
                                    let verify_code = cryptoRandomString({
                                        length: 6,
                                    });
                                    User.findOneAndUpdate(
                                        { uid: data.uid },
                                        { "verify.verify_code": verify_code },
                                        function (err, result) {
                                            if (err) return console.error(err);
                                            console.log("2");
                                            sendEmail(
                                                result.email,
                                                verify_code,
                                                "account"
                                            );
                                            db.close();
                                            res.status(200).json({
                                                message: "Email Re-sent.",
                                            });
                                            return resolve();
                                        }
                                    );
                                }
                            }
                        );
                    });
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
