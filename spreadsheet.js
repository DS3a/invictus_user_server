const {google} = require("googleapis");
const {GoogleAuth} = require("google-auth-library");

require("dotenv").config();

async function accessSpreadsheet() {
    const auth = new GoogleAuth({
        keyFile: "client_secret.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({version: "v4", auth: client});

    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId: process.env.doc_ID 
    });

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: process.env.doc_ID,
        range: "by mail ID"
    });


    return getRows.data.values;
}

module.exports = { accessSpreadsheet };