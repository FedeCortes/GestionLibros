import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {createUploadLink} from 'apollo-upload-client'
import {onError} from "apollo-link-error";
import {ApolloLink} from 'apollo-link'

const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
        graphQLErrors.forEach(
            (graphQlError) => {

                const {message, locations, path, extensions} = graphQlError

                //Show error on console
                console.error(`[GraphQL error]: Message: ${message}, Code: ${extensions.code}, Path: ${path}, Location ${locations}`)

            }
        );

    if (networkError) {
        console.error(`[Network error]: ${networkError}, message: ${networkError.message}`);

    }
});

const uploadLink = createUploadLink({
 uri:"http://localhost:4000/graphql"
})

const apolloLink = new ApolloLink((operation, forward) => {
    return forward(operation);
})

const link = ApolloLink.from([
    errorLink,
    apolloLink,
    uploadLink
]);

// Cache implementation
const cache = new InMemoryCache({addTypename: false})

// Create the apollo client
const apolloClient = new ApolloClient({
    link: link,
    cache,
})


export default apolloClient