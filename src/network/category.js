import {request} from './request'

import axios from './axios'

export function getCategory() {
  return request({
    url: '/category'
  })
}

// export function getSubcategory(maitKey) {
//   return request({
//     url: '/subcategory',
//     params: {maitKey}
//   })
// }

// export function getSubcategory(maitKey) {
//   return axios({
//     url: '/subcategory',
//     params: {
//       maitKey
//     }
//   })
// }
 
// export function getCategoryDetail(miniWallkey, type) {
//   return axios({
//     url: '/subcategory/detail',
//     params: {
//       miniWallkey,
//       type
//     }
//   })
// }