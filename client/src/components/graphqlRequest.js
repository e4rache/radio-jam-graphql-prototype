
const endpointURL = 'http://localhost:4000/graphql'

const graphqlRequest = async (query, variables = {}) => {
    const res = await fetch(endpointURL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            query,
            variables
        })
    })

    const { data, errors } = await res.json()

    if (errors) {
        const message = errors.map(error => error.message).join('\n')
        throw new Error(message)
    }
    return data
}

export default graphqlRequest