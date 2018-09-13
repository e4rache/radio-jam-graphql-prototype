const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')

const config = require('./config.js')
const graphqlSchema = require('./graphqlSchema')
const graphqlHTTPParam = require('./graphaqlSchemaLiteral')

mongoose.connection.once('open', () => {
    console.log('connected to database')
})
mongoose.connect(config.MONGOOSE_CONNECT_URL, { useNewUrlParser: true })


const app = express()

app.use(cors())


// Programaticaly defined schema and resolvers
/*
app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    graphiql: true
}))
*/

// template litrals defined schema
app.use('/graphql', graphqlHTTP(graphqlHTTPParam))

app.listen(4000, () => {
    console.log('server listening on port 4000 ...')
})