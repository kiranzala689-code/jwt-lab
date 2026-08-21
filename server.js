const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const app = express()

const connectDB = require("./config/db")
const U_router = require("./router/Userrouter")

connectDB()

app.use(cors())
app.use(express.json())

app.use("/api", U_router)
const PORT=process.env.PORT ||8787
app.listen(PORT, () => {
    console.log(`server listened ${PORT}`)
})