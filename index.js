let Dropbox = require('dropbox').Dropbox
require('isomorphic-fetch')

/**
 * This is the google cloud function entry point fro Sherlock Photos App. 
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.getPhotoURL = (req, res) => {
    switch (req.method) {
        case 'GET':
            getFiles()
                .then((url) => {
                    res.send('This is the url: ' + url)
                })
                .catch((reason) => {
                    console.error('Failure reason: ' + reason)
                    res.status(500).end()
                })
            break
        default:
            res.status(405).end()
    }
}

const getFiles = () => {
    return new Promise((resolve, reject) => {
        let dbx = new Dropbox({
            accessToken: 'YOUR_ACCESS_TOKEN_HERE'
        })
        dbx.filesListFolder({
                path: '/apps/sherlock_photos'
            })
            .then((response) => {
                const paths = response.entries.map((metadataEntry) => {
                    return metadataEntry.path_lower
                })
                if (paths.length === 0) {
                    reject('none found')
                    return
                }
                const randomIndex = Math.floor(Math.random() * paths.length)
                return dbx.filesGetTemporaryLink({
                    path: paths[randomIndex]
                })
            })
            .then((response) => {
                resolve(response.link)
            })
            .catch((reason) => {
                reject(reason)
            })
    })
}