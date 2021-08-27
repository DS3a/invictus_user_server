const express = require("express");
const admin = require("firebase-admin");
const spreadsheets = require("./spreadsheet.js");
const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
const db = admin.firestore();



app.get('/', async (req, res) => {
    const vals = await spreadsheets.accessSpreadsheet();
    var count = 0;
    vals.forEach(val => {
        count += 1;
    });
    res.send({count});
});

app.listen(3000, () => console.log("listening on port 3000"));
