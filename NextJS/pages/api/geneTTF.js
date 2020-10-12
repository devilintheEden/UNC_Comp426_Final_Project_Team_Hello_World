import { spawnSync } from 'child_process';
const path = require("path");

export default (req, res) => {
    try {
        if (req.method === 'POST') {
            let data = req.body;
            spawnSync('python3', [path.join('public','generate_ttf_related.py'), '2', data.usr_id.toString(), data.project_name, data.font_name]);
            //spawnSync('python3', ['./public/dummy.py',' 0', data.usr_id.toString(), data.w, data.h])
        } else {
            throw String("Method not allowed");
        }
    } catch (error) {
        res.status(400).json({ message: JSON.stringify(error, null, 2) });
    }
    return res.status(200).end();
}