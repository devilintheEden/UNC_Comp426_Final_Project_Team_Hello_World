const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    pid: Number,
    projectName: String,
    userOwn: Number,
    last_modified: Date,
    related: {
        ratio_w: Number,
        ratio_h: Number,
        uploaded: Number,
        downloaded: Boolean,
        Sample_pics: String,
    },
    publish: {
        published: Boolean,
        name: String,
        Sample_pics: Array,
        info: String,
        tags: Array,
        license: String,
        likes: Number,
        downloads: Number,
    },
});

mongoose.connect(
    "mongodb+srv://YiyinEllenGu:BMTHQN0BAvYSMOkl@cluster0.mrdmc.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
    let Project = mongoose.model("Project", projectSchema, "projects");
    Project.aggregate([
        { $match: { "publish.published": true } },
        { $project: { pid: 1 } },
    ]).exec((err, result)=>{console.log(Array.from(result, x => x.pid));db.close();});
});
