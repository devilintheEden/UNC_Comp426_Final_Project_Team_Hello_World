import { User, Project, Website } from "../../helper_scripts/DB_helper.js";

export default (req, res) => {
    return new Promise((resolve) => {
        try {
            if (req.method === "POST") {
                let data = req.body;
                if (new Date() - new Date(data.timeStamp) < 1000) {
                    if (typeof data.uid !== "undefined") {
                        User.findOne(
                            {
                                uid: data.uid,
                            },
                            async function (err, result) {
                                if (err) return console.error(err);
                                let this_website = await Website.findOne(
                                    { name: "Calligraphy2Digital" }
                                ).exec();
                                let this_pid = this_website.projectNum;
                                const new_project = new Project({
                                    pid: this_pid,
                                    projectName: "Default Project Name",
                                    userOwn: data.uid,
                                    last_modified: new Date(),
                                    related: {
                                        ratio_w: 1,
                                        ratio_h: 1,
                                        uploaded: false,
                                        downloaded: false,
                                        Sample_pics: "",
                                    },
                                    publish: {
                                        published: false,
                                        name: "",
                                        Sample_pics: [],
                                        info: "",
                                        tags: [],
                                        license: "",
                                        likes: 0,
                                        downloads: 0,
                                    },});
                                    this_website.projectNum += 1;
                                    await this_website.save();
                                    result.related.projects.push(this_pid);
                                    await result.save();
                                    new_project.save(function (err) {
                                        if (err) return console.error(err);
                                        console.log(
                                            "Document inserted succussfully!"
                                        );
                                res.status(200).json({ pid: this_pid });
                                return resolve();
                                        });
                            }
                        );
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
