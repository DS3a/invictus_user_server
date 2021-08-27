//const express = require("express");
const admin = require("firebase-admin");
const spreadsheets = require("./spreadsheet.js");
const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//const app = express();
const db = admin.firestore();

function json_from_spreadsheet(val) {
    console.log(val);
    return {
        email: val[0],
        index: val[1],
        house: val[2]
    };
}

async function check_and_add_users() {
    const usersRef = db.collection("users");
    const vals = await spreadsheets.accessSpreadsheet();
    var count = 0;
    await vals.forEach(async val => {
        const email = val[0];
        let snapshot = await usersRef.where("email", '==', email).get();
        if (snapshot.empty) {
            console.log(`${email} not found... adding it to the database`);
            let user_json = json_from_spreadsheet(val);
            usersRef.add(user_json);
        }
    })
    return count;
} 

setInterval(() => check_and_add_users(), 5*60*1000);
/*
app.get('/', async (req, res) => {
    const count = await check_and_add_users();
    res.send({count});
});

app.listen(3000, () => console.log("listening on port 3000"));
*/