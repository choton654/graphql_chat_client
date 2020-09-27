module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "CHAT",
        fieldName: "chat",
        url: "http://localhost:3000/graphql",
        // refetchInterval: 60,
        // headers: {
        //   // Learn about environment variables: https://gatsby.dev/env-vars
        //   token: localStorage.getItem("token") || null,
        //   refreshToken: localStorage.getItem("refreshToken") || null,
        // },
      },
    },
  ],
}
