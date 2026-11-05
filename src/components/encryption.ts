import { argon2id } from 'hash-wasm';

/**
 * Получение криптографического ключа AES-256-GCM
 * на основе парольной фразы пользователя.
 */
export async function deriveKey(
    passphrase: string,
    salt: Uint8Array
): Promise<CryptoKey> {

    if (!passphrase || passphrase.length < 12) {
        throw new Error('Парольная фраза должна содержать минимум 12 символов');
    }

    if (salt.length !== 16) {
        throw new Error('Соль должна содержать 16 байт');
    }

    // Получаем 256-битный ключ через Argon2id
    const derivedKey = await argon2id({
    password: passphrase,
    salt: salt,
    parallelism: 1,
    iterations: 3,
    memorySize: 65536,
    hashLength: 32,
    outputType: 'binary'
});

const keyBytes = new Uint8Array(derivedKey);

    // Импортируем ключ для AES-256-GCM
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyBytes,
        {
            name: 'AES-GCM'
        },
        false,
        ['encrypt', 'decrypt']
    );

    return cryptoKey;
}


export async function encryptData(
    data: unknown,
    key: CryptoKey
): Promise<string> {

    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encodedData = new TextEncoder().encode(
        JSON.stringify(data)
    );

    const encrypted = await crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv
        },
        key,
        encodedData
    );

    const encryptedBytes = new Uint8Array(encrypted);

    // Объединяем IV и зашифрованные данные
    const combined = new Uint8Array(
        iv.length + encryptedBytes.length
    );

    combined.set(iv);
    combined.set(encryptedBytes, iv.length);

    // Преобразуем в Base64
    let binary = '';

    combined.forEach(byte => {
        binary += String.fromCharCode(byte);
    });

    return btoa(binary);
}

  export async function decryptData<T>(
    encryptedData: string,
    key: CryptoKey
): Promise<T> {

    // Декодируем Base64
    const binary = atob(encryptedData);

    const combined = Uint8Array.from(
        binary,
        char => char.charCodeAt(0)
    );

    // Извлекаем IV
    const iv = combined.slice(0, 12);

    // Извлекаем зашифрованные данные
    const encrypted = combined.slice(12);

    // Расшифровываем
    const decrypted = await crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv
        },
        key,
        encrypted
    );

    // Преобразуем обратно в JSON
    const decoded = new TextDecoder().decode(decrypted);

    return JSON.parse(decoded) as T;
}