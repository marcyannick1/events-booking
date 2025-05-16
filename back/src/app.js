const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config();

const port = process.env.SRV_PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
