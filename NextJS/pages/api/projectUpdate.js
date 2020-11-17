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
                    });
                    const db = mongoose.connection;
                    db.on(
                        "error",
                        console.error.bind(console, "connection error:")
                    );
                    db.once("open", async function () {
                        if (data.uid) {
                            User.findOne(
                                {
                                    uid: data.uid,
                                },
                                function (err, result) {
                                    if (err) return console.error(err);
                                    db.close();
                                    res.status(200).json({pid: 2});
                                    return resolve();
                                }
                            );
                        }
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
