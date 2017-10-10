/**
 * @flow
 */

import fs from 'fs'

/**
 * Promisify the fs.readFile method
 *
 * @param {string} path - file location
 * @return {Promise<Object>} - the file content
 */
export const readFile = async(path: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        return reject(err)
      }
      return resolve(data)
    })
  })
}
