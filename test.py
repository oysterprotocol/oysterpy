from oysterpy import datamap, encryption
from iota.crypto.kerl.conv import convertToTrits, convertToBytes, trits_to_trytes, trytes_to_trits

def to_trytes(str):
  return trits_to_trytes(convertToTrits(str))
def to_bytes(str):
  return convertToBytes(trytes_to_trits(str))

genesis_hash = to_bytes('7e337b70e7cae8fb8d94fd77f6d9c37bd3385f054518d2537b9c8859689ff06b')

print(list(map(lambda str: to_trytes(str), datamap.get_hashchain(genesis_hash))))
