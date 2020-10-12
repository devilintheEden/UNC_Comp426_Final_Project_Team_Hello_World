import formidable from "formidable";
import { spawnSync } from 'child_process';
const fs = require("fs");
const path = require("path");

export const config = {
    api: {
        bodyParser: false
    }
};

const uploadForm = next => async (req, res) => {
    try {
        return new Promise(async (resolve, reject) => {
            try {
                const form = new formidable.IncomingForm({
                    multiples: true
                });
                form.once("error", console.error);
                form.parse(req, async (err, fields, files) => {
                    if (err) {
                        throw String(JSON.stringify(err, null, 2));
                    }
                    const data = JSON.parse(fields.data);
                    const target_dir = path.join(`public`, `Backend`, `Users`, `${data.usr_id}`, `Projects`, `${data.project_name}`, `Uploads`);
                    if (!fs.existsSync(target_dir)) {
                        fs.mkdir(target_dir, { recursive: true }, (err) => {
                            if (err) {
                                return console.error(err);
                            }
                            fs.renameSync(files.file.path, path.join(target_dir, `/${files.file.name}`));
                            spawnSync('python3', [path.join('public','generate_ttf_related.py'), '1', data.usr_id.toString(), data.project_name, files.file.name, data.pdfWH.width, data.pdfWH.height]);
                        });
                    } else {
                        fs.readdir(target_dir, (err_1, files_1) => {
                            if (err_1) throw err_1;
                            for (const file of files_1) {
                                if(path.extname(file) === ".pdf"){
                                    fs.unlink(path.join(target_dir, file), err_2 => {
                                        if (err_2) throw err_2;
                                    });
                                }
                            }
                            fs.renameSync(files.file.path, path.join(target_dir, `/${files.file.name}`));
                            spawnSync('python3', [path.join('public','generate_ttf_related.py'), '1', data.usr_id.toString(), data.project_name, files.file.name, data.pdfWH.width, data.pdfWH.height]);
                        });
                    }
                    req.form = { fields, files };
                    return resolve(next(req, res));
                })
            } catch (error) {
                return resolve(res.status(403).send(error));
            }
        });
    } catch (error_1) {
        console.log(error_1);
    }
}

function handler(req, res) {
    try {
        if (req.method === "POST") {
            res.status(200).send(req.form);
        } else {
            throw String("Method not allowed");
        }
    } catch (error) {
        res.status(400).json({ message: JSON.stringify(error, null, 2) });
    }
}

export default uploadForm(handler);