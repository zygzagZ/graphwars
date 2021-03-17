const crypto = require('crypto')

function randomBase64 (len) {
  return crypto.randomBytes(12).toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_') // url safe
}

export default class Room {
  // members = []
  // leaders = []
  // auth = {}
  // map = []
  // id = null
  // dictionary = null
  // dictionaries
  // firstColor

  constructor (dictionaries, dict) {
    this.id = randomBase64(12)
    this.dictionaries = dictionaries
    this.members = []
    this.leaders = []
    this.map = []
    this.auth = {}
    this.duet = false
  }
}
