import { connectToDatabase } from '../../helper_scripts/mongodb'

export default async (req, res) => {
    try {
        if (req.method === "POST") {
            let data = req.body;

            if (new Date() - new Date(data.timeStamp) < 1000) {
                const query = data.query

                const { db } = await connectToDatabase();

                const fonts = await await db
                    .collection("projects")
                    .find({
                        projectName: new RegExp(query, 'i')
                    })
                    .toArray()

                const fontNames = fonts.map(font => font.projectName)

                const users = await db
                    .collection("users")
                    .find({ 'profile.profileName': new RegExp(query, 'i') })
                    .toArray()

                const userNames = users.map(user => user.profile.profileName)

                const results = fontNames.concat(userNames)

                if (results.length == 0) {
                    res.status(200).json({ fail: true })
                } else {
                    res.status(200).json({ 'results': results })
                }
            } else {
                throw String("timeout");
            }
        } else {
            throw String("Method not allowed");
        }
    } catch (error) {
        res.status(400).json({ message: JSON.stringify(error, null, 2) });
    }
};