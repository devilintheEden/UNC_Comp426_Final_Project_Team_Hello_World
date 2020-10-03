import {spawnSync} from 'child_process'

export default (req, res) => {
    if (req.method === 'POST') {
        let data = req.body;
    spawnSync('python3', ['./public/generate_ttf_related.py', '0', data.usr_id.toString(), data.w, data.h]);
    //spawnSync('python3', ['./public/dummy.py',' 0', data.usr_id.toString(), data.w, data.h])
    }
    return res.status(200).end();
}
