import { Schema, model } from "mongoose";

const userSchema = new Schema({
    uid: Number,
    email: String,
    googleIdtoken: String,
    password: String,
    salt: String,
    user_init_time: Number,
    latest_cookie: String,
    verify: {
        verify_code: String,
        verified: Boolean,
    },
    profile: {
        profileName: String,
        profilePic: String,
        profileBio: String,
    },
    related: {
        projects: Array,
        liked: Array,
    },
});

let User;

try {
    User = model('users');
} catch (error) {
    User = model('users', userSchema);
}

const projectSchema = new Schema({
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
    }
});

let Project;

try {
    Project = model("Project");
} catch (error) {
    Project = model("Project", projectSchema);
}

const websiteSchema = new Schema({
    name: String,
    usrNum: Number,
    projectNum: Number,
});

let Website;

try {
    Website = model("Website");
} catch (error) {
    Website = model("Website", websiteSchema);
}

async function findThisWebsite() {
    let this_website;
    if (!(await Website.exists({ name: "Calligraphy2Digital" }))) {
        this_website = new Website({ name: "Calligraphy2Digital", usrNum: 0, projectNum: 0 });
    } else {
        this_website = await Website.findOne({ name: "Calligraphy2Digital" }).exec();
    }
    return this_website;
}

export { User, Project, Website, findThisWebsite };