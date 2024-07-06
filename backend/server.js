const express = require('express');
const cors = require('cors');
const youtubedl = require('youtube-dl-exec');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/download', async (req, res) => {
    const url = req.body.url;
    const videoID = new URL(url).searchParams.get('v');
    const downloadDir = path.join(__dirname, 'downloads');
    if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir, { recursive: true });
    }
    const filePath = path.join(downloadDir, `${videoID}.mp4`);

    try {
        await youtubedl(url, {
            output: filePath,
            format: 'mp4'
        });

        res.download(filePath, `${videoID}.mp4`, (err) => {
            if (err) {
                console.error(`Error: ${err.message}`);
            }
            // Optionally, delete the file after download
            // fs.unlinkSync(filePath);
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send('Error downloading video');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
