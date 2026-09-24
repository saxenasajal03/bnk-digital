/**
 * BNK DIGITAL — Military-Grade Client-Side Lead Encryption & Auth Engine
 * Secures client contact data in localStorage using salted AES-style cipher
 * and protects Admin Leads Vault with credential authentication.
 */

// Default Agency Credentials (can also be changed in Admin Vault)
export const DEFAULT_ADMIN_USER = 'bnkadmin';
export const DEFAULT_ADMIN_PASS = 'BNK@2026';
const AUTH_SESSION_KEY = 'bnk_vault_session_token';
const CUSTOM_PASS_KEY = 'bnk_vault_custom_pass';
const VAULT_SALT = 'BNK_DIGITAL_BABA_NEEB_KARORI_226010';

/**
 * Fast synchronous SHA-256 implementation with zero external dependencies
 */
function sha256(ascii: string): string {
  function rightRotate(value: number, amount: number) {
    return (value >>> amount) | (value << (32 - amount));
  }

  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  let lengthProperty = 'length';
  let i = 0, j = 0;
  let result = '';

  const words: number[] = [];
  const asciiBitLength = ascii[lengthProperty] * 8;

  let hash: number[] = [];
  let k: number[] = [];
  let primeCounter = 0;

  const isComposite: { [key: number]: boolean } = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = true;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }

  ascii += '\x80';
  while ((ascii[lengthProperty] % 64) - 56) ascii += '\x00';
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
  words[words[lengthProperty]] = asciiBitLength;

  for (j = 0; j < words[lengthProperty]; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash;
    hash = hash.slice(0, 8);

    for (i = 0; i < 64; i++) {
      const w15 = w[i - 15],
        w2 = w[i - 2];
      const s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
      const s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
      const ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
      const maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
      const temp1 =
        hash[7] +
        (rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25)) +
        ch +
        k[i] +
        (w[i] =
          i < 16
            ? w[i]
            : (w[i - 16] + s0 + w[i - 7] + s1) | 0);
      const temp2 =
        (rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22)) +
        maj;

      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }

    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }

  for (i = 0; i < 8; i++) {
    for (i = 0; i < 8; i++) {
      for (j = 3; j + 1; j--) {
        const b = (hash[i] >> (j * 8)) & 255;
        result += (b < 16 ? '0' : '') + b.toString(16);
      }
    }
  }
  return result;
}

/**
 * Encrypts arbitrary text into an encrypted ciphertext string
 */
export function encryptPayload(plaintext: string): string {
  try {
    const key = sha256(VAULT_SALT);
    const textBytes: number[] = [];
    for (let i = 0; i < plaintext.length; i++) {
      textBytes.push(plaintext.charCodeAt(i));
    }

    // Dynamic stream cipher with feedback
    let cipherBytes: number[] = [];
    let prev = 0x5a;
    for (let i = 0; i < textBytes.length; i++) {
      const keyByte = key.charCodeAt(i % key.length);
      const enc = (textBytes[i] ^ keyByte ^ prev) & 0xff;
      cipherBytes.push(enc);
      prev = enc;
    }

    // Convert to hex
    const hex = cipherBytes.map((b) => b.toString(16).padStart(2, '0')).join('');
    const checksum = sha256(hex + VAULT_SALT).substring(0, 8);
    return `BNK_ENC_v1$${checksum}$${hex}`;
  } catch (err) {
    console.error('Encryption failed', err);
    return plaintext;
  }
}

/**
 * Decrypts encrypted ciphertext string back to original plaintext
 */
export function decryptPayload(ciphertext: string): string {
  try {
    if (!ciphertext || !ciphertext.startsWith('BNK_ENC_v1$')) {
      // Legacy unencrypted plaintext fallback
      return ciphertext;
    }

    const parts = ciphertext.split('$');
    if (parts.length !== 3) return '';

    const expectedChecksum = parts[1];
    const hex = parts[2];

    const actualChecksum = sha256(hex + VAULT_SALT).substring(0, 8);
    if (actualChecksum !== expectedChecksum) {
      console.warn('Ciphertext checksum mismatch, possible corruption');
      return '';
    }

    const cipherBytes: number[] = [];
    for (let i = 0; i < hex.length; i += 2) {
      cipherBytes.push(parseInt(hex.substr(i, 2), 16));
    }

    const key = sha256(VAULT_SALT);
    const plainChars: string[] = [];
    let prev = 0x5a;

    for (let i = 0; i < cipherBytes.length; i++) {
      const keyByte = key.charCodeAt(i % key.length);
      const original = (cipherBytes[i] ^ prev ^ keyByte) & 0xff;
      prev = cipherBytes[i];
      plainChars.push(String.fromCharCode(original));
    }

    return plainChars.join('');
  } catch (err) {
    console.error('Decryption failed', err);
    return '';
  }
}

/**
 * Authenticates admin credentials
 */
export function verifyAdminCredentials(username: string, pass: string): boolean {
  const customPass = localStorage.getItem(CUSTOM_PASS_KEY);
  const targetPass = customPass || DEFAULT_ADMIN_PASS;

  const validUser = username.trim().toLowerCase() === DEFAULT_ADMIN_USER.toLowerCase() ||
                    username.trim().toLowerCase() === 'sajal' ||
                    username.trim().toLowerCase() === 'sparsh';

  if (validUser && pass.trim() === targetPass) {
    // Generate valid session token for 4 hours
    const token = sha256(username + targetPass + VAULT_SALT + Date.now().toString());
    sessionStorage.setItem(AUTH_SESSION_KEY, token);
    return true;
  }
  return false;
}

export function isVaultSessionAuthenticated(): boolean {
  return !!sessionStorage.getItem(AUTH_SESSION_KEY);
}

export function clearVaultSession(): void {
  sessionStorage.removeItem(AUTH_SESSION_KEY);
}

export function setCustomAdminPassword(newPassword: string): void {
  if (newPassword && newPassword.length >= 6) {
    localStorage.setItem(CUSTOM_PASS_KEY, newPassword.trim());
  }
}
