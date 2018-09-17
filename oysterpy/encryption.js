import random from 'node-forge/lib/random'
import { sha3_256 } from 'js-sha3'
import sha256 from 'node-forge/lib/sha256'
import ed25519 from 'node-forge/lib/ed25519'

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
}
