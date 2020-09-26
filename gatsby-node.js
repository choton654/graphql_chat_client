exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/^\/app/)) {
    page.matchPath = "/app/*"
    createPage(page)
  }
}

// const path = require(`path`)

// exports.createPages = async ({ actions: { createPage }, graphql }) => {
//   const { data } = await graphql(`
//     query {
//       chat {
//         allTeams {
//           id
//           name
//           channels {
//             id
//             name
//           }
//         }
//       }
//     }
//   `)

//   createPage({
//     path: `/app/view-team`,
//     component: path.resolve("./src/components/view-teams.js"),
//     context: { data },
//   })
// }
