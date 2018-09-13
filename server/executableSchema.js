
const { makeExecutableSchema } = require('graphql-tools')

const Radio = require('./mongoModels/radio')
const Tube = require('./mongoModels/tube')
const TubeContainerLink = require('./mongoModels/tubeContainerLink')

const typeDefs =
    `
    type Radio {
        id: ID!
        brand : String!
        model : String
        serialNumber : String
        description :  String
        containerType : String
        tubes: [TubeInRadio]!
    }

    type Tube {
        id: ID!
        model : String!
        radios: [TubeInRadio]!
    }

    type TubeInRadio {
        linkId: ID!
        tube: Tube!
        quantity: Int!
        radio: Radio!
    }

    type Query {
        
        radio(id: ID!): Radio
        
        radios : [Radio]
        
        findRadios(brand: String, model: String, serialNumber: String, description: String, containerType: String):[Radio]
        
        tube(id: ID!) : Tube
        tubes : [Tube]!
        findTubes (model: String) : [Tube]!

    }
  
    type Mutation {
        
        addRadio(brand: String, model: String, serialNumber: String, description: String, containerType: String): Radio

        updateRadio(id:ID!,brand: String, model: String, serialNumber: String, description: String): Radio
    
        deleteRadio(id: ID!): Boolean
    

        addTube(model: String!): Tube!    
        deleteTube(id: ID!): Boolean!
        updateTube(id: ID!, model:String!):Tube!

        addTubeToRadio(tubeId: ID!, radioId: ID!): Int!
        removeTubeFromRadio(tubeId: ID!, radioId: ID!): Int!
    }
`

// queries

const resolvers = {
    Query: {
        radio: (parent, args) => Radio.findById(args.id),
        radios: (parent, args) => Radio.find(),
        findRadios: (parent, args) => Radio.find(args),

        tube: (parent, args) => Tube.findById(args.id),
        tubes: (parent, args) => Tube.find(),
        findTubes: (parent, args) => Tube.find(args),

    },
    Mutation: {
        addRadio: (parent, args) => (new Radio(args)).save(),
        updateRadio: async (parent, args) => {
            const { id } = args
            delete args['id']
            delete args['_id']
            await Radio.updateOne({ _id: id }, { $set: args }).exec()
            const r = await Radio.findById(id)
            return r
        },
        deleteRadio: async (parent, args) => {
            const r = await Radio.remove({ _id: args.id }).exec()
            return r.n
        },

        addTube: async (parent, args) => (new Tube(args)).save(),
        deleteTube: async (parent, args) => {
            const r = await Tube.remove({ _id: args.id }).exec()
            return r.n
        },
        updateTube: async (parent, args) => {
            const { id } = args
            delete args['id']
            delete args['_id']
            await Tube.updateOne({ _id: id }, { $set: args }).exec()
            const r = await Tube.findById(id)
            console.log(r)
            return r
        },
        addTubeToRadio: async (parent, args) => {
            // find out if a TubeContainerLink already exists

            const tubeId = args.tubeId
            const radioId = args.radioId

            let link = await TubeContainerLink.findOne({ tubeId, containerId: radioId })
            console.log(link)

            if (link === null) {
                console.log('no link found, create a new one!')
                link = await new TubeContainerLink({
                    tubeId,
                    containerId: radioId,
                    quantity: 1
                }).save()
                console.log(link)
            } else {
                link.quantity++
                await link.save()
            }

            return link.quantity
        },
        removeTubeFromRadio: async (parent, { tubeId, radioId }) => {
            let link = await TubeContainerLink.findOne({ tubeId, containerId: radioId })
            console.log('link', link)
            if (link === null) return 0
            if (link.quantity === 1) {
                await TubeContainerLink.remove({ _id: link.id }).exec()
                return 0
            } else {
                link.quantity--
                await link.save()
                return link.quantity
            }
        },
    },

    Radio: {
        tubes: async (radio, args) => {
            const links = await TubeContainerLink.find({ containerId: radio._id })
            const tubeInRadioArray = []
            for (link of links) {
                const tube = await Tube.findById(link.tubeId)
                const tubeInRadio = {
                    linkId: link.id,
                    tube,
                    quantity: link.quantity,
                    radio
                }
                tubeInRadioArray.push(tubeInRadio)
            }
            return tubeInRadioArray
        }
    },

    Tube: {
        radios: async (tube, args) => {
            const links = await TubeContainerLink.find({
                tubeId: tube._id
            })
            const tubeInRadioArray = []
            for (link of links) {
                const radio = await Radio.findById(link.containerId)
                const tubeInRadio = {
                    linkId: link.id,
                    tube,
                    quantity: link.quantity,
                    radio
                }
                tubeInRadioArray.push(tubeInRadio)
            }
            return tubeInRadioArray
        }
    },
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const graphqlHTTPParam = {
    schema,
    graphiql: true
}

module.exports = graphqlHTTPParam