import apolloClient from "@/apollo"

class BooksProvider{
    
    constructor() {
        this.gqlc = null
    }

    setGqlc(gqlc){
        this.gqlc = gqlc
    }
    booksFetch(author, title, page, limit, filters){ //recibe limit y page
        return this.gqlc.query({
            query: require("./graphql/booksFetch.graphql"),
            variables: {
                author, title, page, limit, filters
            },
            fetchPolicy: "network-only"
        }) 
    }
    bookFindById(id){
        return this.gqlc.query({
            query: require("./graphql/bookFindById.graphql"),
            variables: {
                id
            },
            fetchPolicy: "network-only"
        }) 
    }
    bookCreateOne({ author, title, description, year, genre, rating, numPages, format }) {
        return this.gqlc.mutate({
          mutation: require("./graphql/bookCreateOne.graphql"),
          variables: { author, title, description, year, genre, rating, numPages, format },
        });
      }
    
    deleteBookById(id) {
        return this.gqlc.mutate({
          mutation: require("./graphql/deleteBookById.graphql"),
          variables: { id },
        });
      }
    
    bookFindByIdAndUpdate({ id, author, title, description, year, genre, rating, numPages, format }) {
        return this.gqlc.mutate({
          mutation: require("./graphql/bookFindByIdAndUpdate.graphql"),
          variables: { id, author, title, description, year, genre, rating, numPages, format },
        });
      }
    }

const booksProvider = new BooksProvider()
booksProvider.setGqlc(apolloClient)

export default booksProvider