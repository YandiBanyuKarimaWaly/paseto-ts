import { base64UrlDecode, base64UrlEncode } from '../../src/lib/base64url';

import { concat } from '../../src/lib/uint8array';
import { test, type TestContext } from 'node:test';

const INPUT = 'Hello, world!';
const INPUT_BASE64 = 'SGVsbG8sIHdvcmxkIQ==';
const INPUT_BASE64URL = 'SGVsbG8sIHdvcmxkIQ';
const INPUT_UINT8ARRAY = new TextEncoder().encode(INPUT);

test('base64UrlEncode encodes base64url', (t: TestContext) => {
    const inputUint8Array = new TextEncoder().encode(INPUT);
    const encoded = base64UrlEncode(inputUint8Array);
    t.assert.strictEqual(encoded, INPUT_BASE64URL);
});

test('base64UrlDecode decodes base64url', (t: TestContext) => {
    const decoded = base64UrlDecode(INPUT_BASE64URL);
    t.assert.strictEqual(decoded.byteLength, 13);
    t.assert.strictEqual(new TextDecoder().decode(decoded), INPUT);
});

test('base64UrlDecode throws on invalid base64url', (t: TestContext) => {
    t.assert.throws(() => base64UrlDecode('SGVsbGbbb8sIHdvcmxkIQ'));
});

test('base64UrlDecode throws on invalid type', (t: TestContext) => {
    t.assert.throws(() => base64UrlDecode(123 as any));
});

test('base64UrlEncode throws on invalid type', (t: TestContext) => {
    t.assert.throws(() => base64UrlEncode("foo" as any));
});
