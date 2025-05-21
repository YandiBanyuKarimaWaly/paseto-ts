import * as crypto from 'node:crypto';

import { PasetoFormatInvalid, PasetoPurposeInvalid } from '../../src/lib/errors';

import { base64UrlDecode } from '../../src/lib/base64url';
import { generateKeys } from '../../src/v4/key';
import { test, type TestContext } from 'node:test';

const getRandomValues = (array: Uint8Array): Uint8Array => {
    const bytes = crypto.randomBytes(array.length);
    array.set(bytes);
    return array;
};

test('it throws with a bad purpose', async (t: TestContext) => {
    try {
        const keys = generateKeys('badpurpose' as any, { getRandomValues });
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoPurposeInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_PURPOSE_INVALID');
    }
});

test('it throws with a bad format', async (t: TestContext) => {
    try {
        const keys = generateKeys('local', { format: 'päserk' as any, getRandomValues });
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoFormatInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_FORMAT_INVALID');
    }

    try {
        const keys = generateKeys('public', { format: 'päserk' as any, getRandomValues });
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoFormatInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_FORMAT_INVALID');
    }
});

test('generates a random secret key for local purpose (paserk)', async (t: TestContext) => {
    const key = generateKeys('local', { format: 'paserk', getRandomValues });
    t.assert.strictEqual(typeof key, 'string');
    t.assert.strictEqual(key.startsWith('k4.local.'), true);
    t.assert.strictEqual(key.split('.')[2].length, 43);
    t.assert.strictEqual(base64UrlDecode(key.split('.')[2]).byteLength, 32);
});

test('generates a random secret key for local purpose (buffer)', async (t: TestContext) => {
    const key = generateKeys('local', { format: 'buffer', getRandomValues });
    const keyStr = new TextDecoder().decode(key);
    t.assert.strictEqual(key instanceof Uint8Array, true);
    t.assert.strictEqual(key.byteLength, 41);
    t.assert.strictEqual(keyStr.startsWith('k4.local.'), true);
    t.assert.strictEqual(key.slice(9).byteLength, 32);
});

test('generates a random key pair for public purpose (paserk)', async (t: TestContext) => {
    const keyPair = generateKeys('public', { format: 'paserk', getRandomValues });
    t.assert.strictEqual(typeof keyPair, 'object');
    t.assert.strictEqual(typeof keyPair.secretKey, 'string');
    t.assert.strictEqual(typeof keyPair.publicKey, 'string');
    t.assert.strictEqual(keyPair.secretKey.startsWith('k4.secret.'), true);
    t.assert.strictEqual(keyPair.publicKey.startsWith('k4.public.'), true);
    t.assert.strictEqual(keyPair.secretKey.split('.')[2].length, 86);
    t.assert.strictEqual(keyPair.publicKey.split('.')[2].length, 43);
    t.assert.strictEqual(base64UrlDecode(keyPair.secretKey.split('.')[2]).byteLength, 64);
    t.assert.strictEqual(base64UrlDecode(keyPair.publicKey.split('.')[2]).byteLength, 32);
});

test('generates a random key pair for public purpose (buffer)', async (t: TestContext) => {
    const keyPair = generateKeys('public', { format: 'buffer', getRandomValues });
    const secretKeyStr = new TextDecoder().decode(keyPair.secretKey);
    const publicKeyStr = new TextDecoder().decode(keyPair.publicKey);
    t.assert.strictEqual(keyPair.secretKey instanceof Uint8Array, true);
    t.assert.strictEqual(keyPair.publicKey instanceof Uint8Array, true);
    t.assert.strictEqual(keyPair.secretKey.byteLength, 74);
    t.assert.strictEqual(keyPair.publicKey.byteLength, 42);
    t.assert.strictEqual(secretKeyStr.startsWith('k4.secret.'), true);
    t.assert.strictEqual(publicKeyStr.startsWith('k4.public.'), true);
    t.assert.strictEqual(keyPair.secretKey.slice(10).byteLength, 64);
    t.assert.strictEqual(keyPair.publicKey.slice(10).byteLength, 32);
});

test('it defaults to paserk format', async (t: TestContext) => {
    const key = generateKeys('local', { getRandomValues });
    t.assert.strictEqual(typeof key, 'string');
    t.assert.strictEqual(key.startsWith('k4.local.'), true);
    t.assert.strictEqual(key.split('.')[2].length, 43);
    t.assert.strictEqual(base64UrlDecode(key.split('.')[2]).byteLength, 32);
});

test('on node 19, getRandomValues is not needed', async (t: TestContext) => {
    const version = process.version;
    if (version.startsWith('v19')) {
        const key = generateKeys('local', { getRandomValues });
        t.assert.strictEqual(typeof key, 'string');
        t.assert.strictEqual(key.startsWith('k4.local.'), true);
        t.assert.strictEqual(key.split('.')[2].length, 43);
        t.assert.strictEqual(base64UrlDecode(key.split('.')[2]).byteLength, 32);
    } else {
        console.log('skipping test, not node 19');
    }
});
