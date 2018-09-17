import sha256 from 'node-forge/lib/sha256'
import sha512 from 'node-forge/lib/sha256'
const sha384 = sha512.sha384

import converter from 'iota.lib.js/converter'

const hashlib = { sha256, sha512, sha384 }

export function get_hashchain (startingHash, n) {
  const hashchain = [startinghash]
  let nextHash = startingHash

  for (let _ = 0; _ < n; _++) {
    nextHash = hashlib.sha256.create().update(nextHash).digest().bytes()
    hashchain.push(nextHash)
  }

  return hashchain
}

export function get_offset_hash () {
  let nextHash = startingHash

  for (let _ = 0; _ <= n; _++)
    nextHash = hashlib.sha256.create().update(nextHash).digest().bytes()

  return nextHash
}

export function* createDatamapGenerator (startingHash, n = undefined, offset) {
  let nextHash = startingHash, obfuscatedhash, address

  if (offset)
    for (let _ = 0; _ <= offset; _++)
      nextHash = hashlib.sha256.create().update(nextHash).digest().bytes()

  while (n === undefined || --n > 0) {
    obfuscatedhash = hashlib.sha384.create().update(nextHash).digest().bytes()
    address = converter.asciiToTrytes(obfuscatedhash).slice(0, 81)
    nextHash = hashlib.sha256.create().update(nextHash).digest().bytes()
    yield address
  }
}

export function get_address_batch (startingHash, n) {
  const gen = createDatamapGenerator(startingHash, n)
  const addressList = [...gen]

  return addressList
}

export function exclude_treasure_addresses_from_list (addressList, startingHash_abs_index, sectorSize = 1000000) {
  const to_exclude = []

  for (let i = startingHash_abs_index; i < (startingHash_abs_index + addressList.length) / sectorSize; i += sectorSize) {
    const relative_idx = i - startingHash_abs_index
    to_exclude.push(relative_idx)
  }

  const correctedAddressList = addressList.filter((address, i) => !to_exclude.includes(i))

  return correctedAddressList
}
