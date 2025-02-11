// import { defineConfig, loadEnv } from 'vite'
// import react from '@vitejs/plugin-react'
// import iteriaLowcode from '@iteria-app/vite-plugin-lowcode'

// process.env.CWD = process.cwd()
// const endpointURL = loadEnv(
//   process.env.NODE_ENV,
//   process.env.CWD
// )?.VITE_HASURA_GRAPHQL_ENDPOINT


// export default defineConfig(
//   {
//   plugins: [react(),
//   iteriaLowcode({ 
//     graphQLEndpoint: endpointURL,
//     //injectDevServer: true
//   })],
//   define: {
//     "process.env.NODE_ENV": `"development"`,
//   },
// })

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import iteriaLowcode from '@iteria-app/vite-plugin-lowcode'
import * as path from 'path'


export default ({ command, mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }


  return defineConfig({
    optimizeDeps: {
      exclude: ['@iteria-app/wysiwyg',] //'@iteria-app/component-templates',  '@iteria-app/ide-devserver', '@iteria-app/generator', '@iteria-app/graphql-lowcode']
    },
    resolve: {
      alias: {
        os: 'os-browserify',
        path: 'path-browserify',
        module: path.resolve(__dirname, './src/constants.ts'),
      },
    },
    server: {
      port: 3000,
    },
    plugins: [
      react(),
      iteriaLowcode({
        command,
        mode,
        graphQLEndpoint: process.env.VITE_HASURA_GRAPHQL_ENDPOINT,
        cwd: process.cwd(),
        injectMode: Boolean(process.env.GITPOD_WORKSPACE_ID)
          ? 'devServer'
          : 'jamstack',
      }),
    ],  
    define: {
      "process.env.NODE_ENV": `"development"`,
    },
  })
}

