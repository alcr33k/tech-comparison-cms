import { GraphQLClient, gql } from 'graphql-request'

export default defineEventHandler(async () => {
  const articlesQuery = gql`
    query Articles($onlyPublished: Boolean) {
      articles(onlyPublished: $onlyPublished) {
        id
        title
        url
      }
    }
  `
  const graphQLClient = new GraphQLClient(process.env.API_URL)
  const variables = { onlyUnpublished: false }
  return graphQLClient.request(articlesQuery, variables)
})
