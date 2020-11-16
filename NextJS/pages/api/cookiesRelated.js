const mongoose = require("mongoose");
import { User } from "../../helper_scripts/DB_helper.js";

export default (req, res) => {
    return new Promise((resolve) => {
        try {
            if (req.method === "POST") {
                let data = req.body;
                if (new Date() - new Date(data.timeStamp) < 1000) {
                    mongoose.connect("mongodb://localhost/test", {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        useFindAndModify: false
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
                                if (data.uid) {
                                    User.findOneAndUpdate(
                                        {
                                            uid: data.uid,
                                        },
                                        { latest_cookie: data.cookie },
                                        function (err) {
                                            if (err) return console.error(err);
                                            db.close();
                                            res.status(200).end();
                                            return resolve();
                                        }
                                    );
                                } else {
                                    User.findOne(
                                        {
                                            latest_cookie: data.cookie,
                                        },
                                        function (err, result) {
                                            if (err) return console.error(err);
                                            let temp = -1;
                                            if (result) {
                                                temp = result.uid;
                                            }
                                            db.close();
                                            res.status(200).json({
                                                uid: temp,
                                            });
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
