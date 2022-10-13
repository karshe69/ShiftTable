const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 3000
const app = express()
const path = require('path')
app.use(cors({ origin: true }))

var serviceAccount = require("./permissions.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/login.html'))
})

app.use(express.static('./public'))

app.set('view engine', 'ejs')

app.get('/table/:tableID', (req, res) => {
    res.render("table", { data: { tableID: req.params.tableID } })
})


app.listen(port, () => (console.log("listening on port" + port)))

/*
git public
git commit -m "commit"
git push -f heroku
*/

//yarden.karsh@gmail.com    brbr1212
//tomo@gmail.com            tomo1234