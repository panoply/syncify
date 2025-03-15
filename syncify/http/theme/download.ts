// import type { Target } from 'types';

// import { join } from 'node:path';

// import axios from 'axios';
// import { ensureFile, writeFile } from 'fs-extra';
// import pMap from 'p-map';

// import * as _ from '@syncify/ansi';
// import { format } from '@syncify/json';
// import { timer } from '@syncify/timer';

// import { http } from '~http/client';
// import { themeFilesCount } from '~http/theme';
// import { log } from '~log';

// import { $ } from '$';

// export declare namespace Download {

//   /**
//    * Graphql `userErrors` available as `errors` in {@link Count.Resolve}
//    *
//    * - {@link themeFilesCount}
//    */
//   export interface UserErrors {
//     /**
//      * The error code
//      */
//     code: string;
//     /**
//      * Unique identifier associated with the operation and the theme file.
//      */
//     filename: string
//   }

//   /**
//    * Graphql Response
//    *
//    * - {@link themeFilesCount}
//    */
//   export interface Response {
//     /**
//      * Returns a particular theme for the shop.
//      */
//     theme: {
//       /**
//        * The files in the theme.
//        */
//       files: {
//         /**
//          * The connection between the node and its parent.
//          * Each edge contains a minimum of the edge's cursor and the node
//          */
//         edges: Array<{
//           /**
//            * The item at the end of OnlineStoreThemeFileEdge.
//            */
//           node: {
//             /**
//              * The unique identifier of the theme file.
//              */
//             filename: string
//           }
//         }>
//         pageInfo: {
//           /**
//            * Whether there are more pages to fetch following the current page.
//            */
//           hasNextPage: boolean;
//           /**
//            * The cursor corresponding to the last node in edges.
//            */
//           endCursor: string;
//         }
//         /**
//          * The graphql user errors
//          */
//         userErrors: Count.UserErrors[]
//       }
//     }
//   }
// }

// function fetchFiles (themeId: string, after: string) {

//   return new Promise((resolve, reject) => {

//     http($.target.default.store.name).post('graphql.json', {
//       query: gql`query ThemeFilesPaginated($themeId: ID!, $after: String) {
//         theme(id: $themeId) {
//           files(first: 32, after: $after) {
//             edges {
//               cursor
//               node {
//                 filename
//                 body {
//                   ...on OnlineStoreThemeFileBodyText {
//                     content
//                   }
//                 }
//               }
//             }
//             userErrors {
//               code,
//               filename
//             }
//             pageInfo {
//               hasNextPage
//               endCursor
//             }
//           }
//         }
//       }`,
//       variables: {
//         themeId,
//         after
//       }
//     }).then(({ data }) => {

//     }).catch();

//   });
// }

// export async function themePull (target: Target) {

//   let hasNextPage = true;
//   let after = null;

//   const files = [];

//   while (hasNextPage) {

//     const { edges, pageInfo } = await fetchFiles(target.gid, after);

//     files.push(...edges.map(edge => edge.node));

//     hasNextPage = pageInfo.hasNextPage;
//     after = pageInfo.endCursor;

//   }

//   files.forEach(file => {
//     console.log(`Filename: ${file.filename}`);
//     // console.log(`Content: ${file.body.content || file.body.contentBase64 || file.body.url}`);
//   });

// };

// export async function themeDownload (target: Target) {

//   let hasNextPage = true;
//   let after = null;

//   const files = [];

//   while (hasNextPage) {

//     const { edges, pageInfo } = await fetchFiles(target.gid, after);

//     files.push(...edges.map(edge => edge.node));

//     hasNextPage = pageInfo.hasNextPage;
//     after = pageInfo.endCursor;

//   }

//   files.forEach(file => {
//     console.log(`Filename: ${file.filename}`);
//     // console.log(`Content: ${file.body.content || file.body.contentBase64 || file.body.url}`);
//   });

// };
