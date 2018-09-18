import random from 'node-forge/lib/random'
import { sha3_256 } from 'js-sha3'
import sha256 from 'node-forge/lib/sha256'
import ed25519 from 'node-forge/lib/ed25519'
import cipher from 'node-forge/lib/cipher'



export function getPrivateHandle () {
  return random.getBytesSync(48)
}

export function getEncryptionKey (privatehandle) {
  sha3_256(privatehandle)
}

export function getKeypair (privatehandle) {
  const seed = sha256.create().update(privatehandle).digest().bytes()

  const keypair = ed25519.generateKeyPair({ seed: seed })

  const {
    privateKey: sk_bytes,
    publicKey: vk_bytes
  } = keypair

  return [sk_bytes, vk_bytes]
}

export function encryptAES (data, encryptionKey) {
  const cipher = cipher.createCipher("AES-GCM", encryptionKey)
  // 12 is recommended by node-forge but pycryptodome uses 16
  const nonce = random.getBytesSync(16)

  cipher.start({ iv: nonce })
  cipher.update(data)
  cipher.finish()

  const {
    output: ciphertext,
    mode: mode
  } = cipher
  const tag = mode.tag

  return [ciphertext, nonce, tag]
}

export function decryptAES (chunk, encryptionKey) {
  const nonce = chunk.slice(-16)
  const ciphertext = chunk.slice(0, -16)

  cipher = cipher.createDecipher("AES-GCM", encryptionKey)

  cipher.start({ iv: nonce })
  cipher.update(ciphertext)
  cipher.finish()

  const plaindata = cipher.output

  return plaindata
}

export function decryptAndVerifyAES (chunk, encryptionKey) {
  const tag = chunk.slice(-16)
  const nonce = chunk.slice(-32, -16)
  const ciphertext = chunk.slice(0, -32)

  cipher = cipher.createDecipher("AES-GCM", encryptionKey)

  cipher.start({ iv: nonce, tag: tag })
  cipher.update(ciphertext)
  const pass = cipher.finish()

  if (!pass)
    throw new Error("EncryptionError: failed to verify cipher tag with decrypted data")

  const plaindata = cipher.output
}

export function signChunk (chunk, signing_key) {
  return ed25519.sign({
    message: chunk,
    privatekey: signing_key
  })
}

export function verifyChunk (chunk, signature, verifying_key) {
  const verified = ed25519.verify({
    message: chunk,
    signature: signature,
    publicKey: verifying_key
  })

  if (!verified)
    throw new Error("SigningError: failed to verify chunk")
}

export function splitChunkAndSignature (chunk) {
  const signature = chunk.slice(-64)
  const data = chunk.slice(0, -64)

  return [data, signature]
}

export function stripTag (chunk) {
  const chunkAndNonce = chunk.slice(0, -16)

  return chunkAndNonce
}



export function bytesToTrytes (bytestring) {

}

export function trytesToBytes (trytestring) {

}
