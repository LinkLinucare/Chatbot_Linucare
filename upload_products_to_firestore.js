const admin = require("firebase-admin");
const fs = require("fs");
const csvParser = require("csv-parser");

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(fs.readFileSync("serviceAccountKey.json", "utf8"));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function uploadCSVToFirestore(csvFilePath) {
  fs.createReadStream(csvFilePath)
    .pipe(csvParser({ separator: ';' })) // <-- IMPORTANT!
    .on("data", async (row) => {
      // Log out the row to see what keys exist
      console.log("DEBUG row:", row);

      // row["Navn"] will now exist if your CSV has a "Navn" header
      const productName = (row["Navn"] || "").trim().toLowerCase();
      if (!productName) {
        console.error("❌ Skipping entry: Product name is empty or invalid");
        return;
      }

      const productData = {
        description: row["Beskrivelse"] ? String(row["Beskrivelse"]).trim() : "No description available",
        stock: row["P� lager?"] ? String(row["P� lager?"]).trim() : "Unknown",
        price: row["Normalpris"] ? `${row["Normalpris"]} DKK` : "N/A",
        image: row["Billeder"] ? String(row["Billeder"]).trim() : "N/A",
        url: row["URL"] ? String(row["URL"]).trim() : "N/A",
      };

      try {
        await db.collection("knowledge_base").doc(productName).set(productData);
        console.log(`✅ Uploaded: ${productName}`);
      } catch (error) {
        console.error(`❌ Error uploading ${productName}:`, error);
      }
    })
    .on("end", () => {
      console.log("🎉 CSV upload complete!");
    });
}

uploadCSVToFirestore("products.CSV");
