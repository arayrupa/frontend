import CryptoJS from 'crypto-js';

const secretKey = 'your-secret-key-here'; // Replace with your actual secret key

export const encryptId = (id) => {
  const encrypted = CryptoJS.AES.encrypt(id, secretKey).toString();
  return encrypted.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

export const decryptId = (encryptedId) => {
  try {
    const decoded = encryptedId.replace(/-/g, '+').replace(/_/g, '/');
    const bytes = CryptoJS.AES.decrypt(decoded, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Error decrypting ID:', error);
    return null;
  }
};
