const config = require('./utils/config')
const express = require('express')
const app = express()
const http = require('http')
const logger = require('./utils/logger')
const cors = require('cors')
const Blog = require('./models/blog')

const server = http.createServer(app)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})