const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 3000
const app = express()
app.use(cors({ origin: true }))

var serviceAccount = require("./permissions.json");
const { async } = require('@firebase/util')
const { QuerySnapshot } = require('@google-cloud/firestore')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

app.get('/read/:collection_name', async (req, res) => {
    try {
        let query = db.collection(req.params.collection_name)
        let response = []
        await query.get().then(QuerySnapshot => {
            let docs = QuerySnapshot.docs
            for (let doc of docs) {
                const selectedItem = {
                    id: doc.id,
                    item: doc.data()
                }
                response.push(selectedItem)
            }
        })
        return res.status(200).send(response)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
})

app.listen(port, () => (console.log("listening on port" + port)))
