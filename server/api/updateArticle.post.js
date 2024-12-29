import { GraphQLClient, gql } from 'graphql-request'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const articleMutation = gql`
  mutation UpdateArticle($articleId: ID!, $sectionsToChange: ArticleSection) {
    updateArticle(articleId: $articleId, sectionsToChange: $sectionsToChange)
  }
  `
  const graphQLClient = new GraphQLClient(process.env.API_URL)
  const variables = { articleId: body.articleId, sectionsToChange: body.sectionsToChange }
  return graphQLClient.request(articleMutation, variables)
})
