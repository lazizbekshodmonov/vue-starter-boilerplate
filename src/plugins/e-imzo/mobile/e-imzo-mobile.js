/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*eslint-disable*/

import GostHash from '@/composables/e-imzo/js/pkcs.js'
import CRC32 from '@/composables/e-imzo/js/crc32.js'

export function EIMZOMobile(site_id) {
  this.site_id = site_id

  this.makeQRCode = function (doc_num, text) {
    if (!this.site_id) {
      return
    }
    if (!doc_num) {
      return
    }
    if (!text) {
      return
    }

    const hasher = new GostHash()
    const text_hash = hasher.gosthash(text)

    let code = this.site_id + doc_num + text_hash
    const crcer = new CRC32()

    const crc32 = crcer.calcHex(code)
    code += crc32

    return [text_hash, code]
  }
}
