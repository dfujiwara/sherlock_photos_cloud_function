/**
 * This is the google cloud function entry point fro Sherlock Photos App. 
 * @param {*} req 
 * @param {*} res 
 */

exports.getPhotoURL = (req, res) => {
    switch (req.method) {
        case 'GET':
            res.send('This would be the url')
            break
        default:
            res.status(405).end()
    }
}
