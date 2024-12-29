import { GraphQLClient, gql } from 'graphql-request'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const articleContentQuery = gql`
  query Query($url: String) {
    articleContent(url: $url) {
        battery
        design
        hardware
        intro
        performance
        priceComparison
        screen
        userReviews
        reasonsToGetLaptop1
        reasonsToGetLaptop2
        metaTitle
        metaDescription
    }
  }
  `

  const graphQLClient = new GraphQLClient(process.env.API_URL)
  const variables = { url: body.articleUrl }
  return graphQLClient.request(articleContentQuery, variables)
})
