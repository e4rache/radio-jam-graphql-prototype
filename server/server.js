const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')

const config = require('./config.js')
const graphqlHTTPParam = require('./executableSchema')

mongoose.connection.once('open', () => {
    console.log('connected to database')
})
mongoose.connect(config.MONGOOSE_CONNECT_URL, { useNewUrlParser: true })

const app = express()
app.use(cors())
app.use('/graphql', graphqlHTTP(graphqlHTTPParam))

app.listen(4000, () => {
    console.log('server listening on port 4000 ...')
})