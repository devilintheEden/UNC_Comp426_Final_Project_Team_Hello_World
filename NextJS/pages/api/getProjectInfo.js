const mongoose = require("mongoose");
import { Project } from "../../helper_scripts/DB_helper.js";

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
                        Project.findOne(
                            {
                                pid: data.pid,
                            },
                            function (err, result) {
                                if (err) return console.error(err);
                                if(result !== null){
                                    res.status(200).json(result);
                                }else{
                                    res.status(200).json({fail: true});
                                }
                                db.close();
                                return resolve();
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
