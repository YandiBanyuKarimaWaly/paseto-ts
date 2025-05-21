import { stringToUint8Array, uint8ArrayToString } from '../../src/lib/uint8array';

import { encrypt } from '../../src/v4/encrypt';
import { test, type TestContext } from 'node:test';
import * as crypto from 'node:crypto';

const key = 'k4.local.TTcJUvQkRlymND41zGOLoykZNhoIKk1jtr82bTl9EHA';
const MESSAGE = '{"sub":"johndoe","iat":"2023-01-09T15:34:46.865Z"}';

const getRandomValues = (array: Uint8Array): Uint8Array => {
    const bytes = crypto.randomBytes(array.length);
    array.set(bytes);
    return array;
};

test('it encrypts a message using a key', (t: TestContext) => {
    const token = encrypt(key, stringToUint8Array(MESSAGE), {
        addExp: false,
        getRandomValues,
    });
    const splitToken = token.split('.');
    t.assert.strictEqual(splitToken.length, 3);
    t.assert.strictEqual(splitToken[0], 'v4');
    t.assert.strictEqual(splitToken[1], 'local');
});

test('it encrypts a message using a key and a footer', (t: TestContext) => {
    const token = encrypt(key, MESSAGE, { footer: 'test', addExp: false, getRandomValues });
    const splitToken = token.split('.');
    t.assert.strictEqual(splitToken.length, 4);
    t.assert.strictEqual(splitToken[0], 'v4');
    t.assert.strictEqual(splitToken[1], 'local');
});

test('it encrypts a message using a key and a footer and an assertion', (t: TestContext) => {
    const token = encrypt(key, MESSAGE, { footer: 'test', assertion: 'test', addExp: false, getRandomValues });
    const splitToken = token.split('.');
    t.assert.strictEqual(splitToken.length, 4);
    t.assert.strictEqual(splitToken[0], 'v4');
    t.assert.strictEqual(splitToken[1], 'local');
});

test('it throws if assertion is not a string or uint8array', (t: TestContext) => {
    t.assert.throws(() => encrypt(key, MESSAGE, { assertion: 1 as any }));
});

test('on node 19, getRandomValues is not required', (t: TestContext) => {
    const version = process.version;
    if (version.startsWith('v19')) {
        const token = encrypt(key, MESSAGE, { footer: 'test', assertion: 'test', addExp: false, getRandomValues });
        const splitToken = token.split('.');
        t.assert.strictEqual(splitToken.length, 4);
        t.assert.strictEqual(splitToken[0], 'v4');
        t.assert.strictEqual(splitToken[1], 'local');
    } else {
        console.log('skipping test, not node 19');
    }
});

