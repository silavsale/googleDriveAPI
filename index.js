const fs = require("fs")
const { google } = require("googleapis")
require("dotenv").config()

async function uploadFile() {
  try {
    console.log("uploadFile")
    const auth = new google.auth.GoogleAuth({
      keyFile: "./googleKey.json",
      scopes: ["https://www.googleapis.com/auth/drive"],
    })

    const driveService = google.drive({
      version: "v3",
      auth,
    })

    const fileMetaData = {
      name: "Ukraine.jpg",
      parents: [process.env.GoogleAPIFolderID],
    }

    const media = {
      mimeType: "image/jpeg",
      body: fs.createReadStream("./Ukraine.jpg"),
    }

    const response = await driveService.files.create({
      resource: fileMetaData,
      media: media,
      field: "id",
    })
    console.log("response", response)
    return response.data.id
  } catch (error) {
    console.log(error)
  }
}

uploadFile().then((data) => {
  console.log(data)
})
