import { PasetoClaimInvalid, PasetoKeyInvalid, PasetoPayloadInvalid } from '../../src/lib/errors';
import { stringToUint8Array, uint8ArrayToString } from '../../src/lib/uint8array';

import { base64UrlDecode } from '../../src/lib/base64url';
import { sign } from '../../src/v4/sign';
import { test, type TestContext } from 'node:test';

const keys = {
    secretKey: 'k4.secret.LMThyMVJEesfQX93MJsB77ISs8Ya9YnaEw3Qk-lZvlA',
    publicKey: 'k4.public.-0I7SWH6aqly35b_DmvNoGpyc4nKBccILXI3XOYzAmA'
};
const MESSAGE = '{"sub":"johndoe","iat":"2023-01-09T15:34:46.865Z"}';

// Keys and token generated with panva/paseto for control
const PANVA_KEYS = {
    secretKey: 'k4.secret.FgbULh0ylLoBsG6KRi2ZM0ZDzNMgaCBp1jB0sbf8OXE',
    publicKey: 'k4.public.gX_9QndMMg2u-p_ojdKho9L2mEruUF3WYW4-ZVFoZMg',
};
const PANVA_TOKEN = 'v4.public.eyJzdWIiOiJuYXBvbGVvbiIsImlhdCI6IjIwMjMtMDEtMTNUMTQ6MTU6NDYuNjQ4WiIsImV4cCI6IjMwMjMtMDEtMDlUMTU6MzQ6NDYuODY1WiJ9sMzd6MAe67mw9cpHxQk8VeEVua-90CoRnl6ubAcDUnfpKhu-tWkW2igPi2DZPrSO8GwWzp4cxMo-vgqaQ2OhCg';
const PANVA_MESSAGE = {
    sub: 'napoleon',
    iat: '2023-01-13T14:15:46.648Z',
    exp: '3023-01-09T15:34:46.865Z'
};

function base64urlToString(str: string) {
    return uint8ArrayToString(base64UrlDecode(str));
}

//
// Keys
//

test('it throws with an invalid key (string)', async (t: TestContext) => {
    try {
        const token = sign('invalid', MESSAGE)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoKeyInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_KEY_INVALID');
    }
});

test('it throws with a key that starts with v4.public. (string)', async (t: TestContext) => {
    try {
        const token = sign('v4.public.invalid', MESSAGE)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoKeyInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_KEY_INVALID');
    }
});

test('it throws with a key that starts with v4.local. (string)', async (t: TestContext) => {
    try {
        const token = sign('v4.local.invalid', MESSAGE)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoKeyInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_KEY_INVALID');
    }
});

test('it throws with an invalid key that starts with v4.secret. (string)', async (t: TestContext) => {
    try {
        const token = sign('v4.secret.invalid', MESSAGE)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoKeyInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_KEY_INVALID');
    }
});

test('it throws with an invalid key (Uint8Array)', async (t: TestContext) => {
    try {
        const token = sign(stringToUint8Array('invalid'), MESSAGE)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoKeyInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_KEY_INVALID');
    }
});

test('it throws with a key that starts with v4.public. (Uint8Array)', async (t: TestContext) => {
    try {
        const token = sign(stringToUint8Array('v4.public.invalid'), MESSAGE)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoKeyInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_KEY_INVALID');
    }
});

test('it throws with a key that starts with v4.local. (Uint8Array)', async (t: TestContext) => {
    try {
        const token = sign(stringToUint8Array('v4.local.invalid'), MESSAGE)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoKeyInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_KEY_INVALID');
    }
});

test('it throws with an invalid key that starts with v4.secret. (Uint8Array)', async (t: TestContext) => {
    try {
        const token = sign(stringToUint8Array('v4.secret.invalid'), MESSAGE)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoKeyInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_KEY_INVALID');
    }
});

test('it throws if key is not a string or Uint8Array', async (t: TestContext) => {
    try {
        const token = sign(123 as any, MESSAGE)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoKeyInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_KEY_INVALID');
    }

    try {
        const token = sign({} as any, MESSAGE)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoKeyInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_KEY_INVALID');
    }

    try {
        const token = sign([] as any, MESSAGE)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoKeyInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_KEY_INVALID');
    }

    try {
        const token = sign(true as any, MESSAGE)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoKeyInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_KEY_INVALID');
    }

    try {
        const token = sign(null as any, MESSAGE)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof TypeError, true);
    }

    try {
        const token = sign(undefined as any, MESSAGE)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof TypeError, true);
    }

    try {
        const token = sign(Symbol('invalid') as any, MESSAGE)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoKeyInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_KEY_INVALID');
    }

    try {
        const token = sign((() => {}) as any, MESSAGE)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoKeyInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_KEY_INVALID');
    }

    try {
        const token = sign(new Date() as any, MESSAGE)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoKeyInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_KEY_INVALID');
    }
});

//
// Claims
//

test('it throws if message is not a JSON string', async (t: TestContext) => {
    try {
        const msg = 'Hello, world!';
        const token = sign(keys.secretKey, msg)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoPayloadInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_PAYLOAD_INVALID');
    }
});

test('it throws if message is not a JSON string (Uint8Array)', async (t: TestContext) => {
    try {
        const msg = stringToUint8Array('Hello, world!');
        const token = sign(keys.secretKey, msg)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoPayloadInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_PAYLOAD_INVALID');
    }
});

test('it throws with malformed JSON', async (t: TestContext) => {
    try {
        const msg = '{ "foo": "bar"';
        const token = sign(keys.secretKey, msg)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoPayloadInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_PAYLOAD_INVALID');
    }
});

test('it throws with malformed JSON (Uint8Array)', async (t: TestContext) => {
    try {
        const msg = stringToUint8Array('{ "foo": "bar"');
        const token = sign(keys.secretKey, msg)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoPayloadInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_PAYLOAD_INVALID');
    }
});

test('it throws if message is not a string or Uint8Array', async (t: TestContext) => {

    try {
        const token = sign(keys.secretKey, 123 as any)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoPayloadInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_PAYLOAD_INVALID');
    }

    try {
        const token = sign(keys.secretKey, 'rocky balboa' as any)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoPayloadInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_PAYLOAD_INVALID');
    }

    try {
        const token = sign(keys.secretKey, true as any)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoPayloadInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_PAYLOAD_INVALID');
    }

    try {
        const token = sign(keys.secretKey, [] as any)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoPayloadInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_PAYLOAD_INVALID');
    }

    try {
        const token = sign(keys.secretKey, null as any)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoPayloadInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_PAYLOAD_INVALID');
    }

    try {
        const token = sign(keys.secretKey, undefined as any)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoPayloadInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_PAYLOAD_INVALID');
    }

});

test('it throws is iat is not a parseable date', async (t: TestContext) => {
    try {
        const msg = { iat: "bubbles" };
        const token = sign(keys.secretKey, msg as any)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoClaimInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_CLAIM_INVALID');
    }
});

test('it throws if nbf is not a parseable date', async (t: TestContext) => {
    try {
        const msg = { nbf: "bubbles" };
        const token = sign(keys.secretKey, msg as any)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoClaimInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_CLAIM_INVALID');
    }
});

test('it throws if exp is not a parseable date', async (t: TestContext) => {
    try {
        const msg = { exp: "bubbles" };
        const token = sign(keys.secretKey, msg as any)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoClaimInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_CLAIM_INVALID');
    }
});

test('it throws if exp is before iat', async (t: TestContext) => {
    try {
        const msg = { iat: new Date().toISOString(), exp: new Date(0).toISOString() };
        const token = sign(keys.secretKey, msg as any)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoClaimInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_CLAIM_INVALID');
    }
});

test('it throws if exp is before nbf', async (t: TestContext) => {
    try {
        const msg = { nbf: new Date().toISOString(), exp: new Date(0).toISOString() };
        const token = sign(keys.secretKey, msg as any)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoClaimInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_CLAIM_INVALID');
    }
});

test('it throws if nbf is before iat', async (t: TestContext) => {
    try {
        const msg = { iat: new Date().toISOString(), nbf: new Date(0).toISOString() };
        const token = sign(keys.secretKey, msg as any)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoClaimInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_CLAIM_INVALID');
    }
});

test('it throws if exp is before now', async (t: TestContext) => {
    try {
        const msg = { exp: new Date(0).toISOString() };
        const token = sign(keys.secretKey, msg as any)
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoClaimInvalid, true);
        t.assert.strictEqual(err.code, 'ERR_PASETO_CLAIM_INVALID');
    }
});

//
// Payload
//

test('it generates an iat claim if none is provided', async (t: TestContext) => {
    const token = sign(keys.secretKey, MESSAGE);
    const splitToken = token.split('.');
    const f = uint8ArrayToString(base64UrlDecode(splitToken[2]));
    t.assert.strictEqual(f.indexOf('"iat":') > -1, true);
});

test('it generates an exp claim if none is provided', async (t: TestContext) => {
    const token = sign(keys.secretKey, MESSAGE);
    const splitToken = token.split('.');
    const f = uint8ArrayToString(base64UrlDecode(splitToken[2]));
    t.assert.strictEqual(f.indexOf('"exp":') > -1, true);
});

test('it signs a message', async (t: TestContext) => {
    const token = sign(keys.secretKey, MESSAGE, {
        addIat: false,
        addExp: false,
    });
    const splitToken = token.split('.');
    t.assert.strictEqual(splitToken.length, 3);
    t.assert.strictEqual(splitToken[0], 'v4');
    t.assert.strictEqual(splitToken[1], 'public');
    t.assert.strictEqual(splitToken[2], 'eyJzdWIiOiJqb2huZG9lIiwiaWF0IjoiMjAyMy0wMS0wOVQxNTozNDo0Ni44NjVaIn3YmulzSdjSqbwRUYM5jnwa3pKM1X95RPDFp0DVuCUQ6kO7i6cqxMiqmLJtxnTdzRHZaKbKL1QfW6KNE33678MA');
});

test('it does not add iat if addIat is false', async (t: TestContext) => {
    const token = sign(keys.secretKey, '{"sub":"napoleon"}', {
        addIat: false,
        addExp: false,
    });
    const splitToken = token.split('.');
    t.assert.strictEqual(splitToken.length, 3);
    t.assert.strictEqual(splitToken[0], 'v4');
    t.assert.strictEqual(splitToken[1], 'public');
    const f = base64urlToString(splitToken[2]).split('}')[0]+'}';
    const payload = JSON.parse(f);
    t.assert.strictEqual(payload.iat, undefined);
});

test('it does not add exp if addExp is false', async (t: TestContext) => {
    const token = sign(keys.secretKey, '{"sub":"napoleon"}', {
        addIat: false,
        addExp: false,
    });
    const splitToken = token.split('.');
    t.assert.strictEqual(splitToken.length, 3);
    t.assert.strictEqual(splitToken[0], 'v4');
    t.assert.strictEqual(splitToken[1], 'public');
    const f = base64urlToString(splitToken[2]).split('}')[0]+'}';
    const payload = JSON.parse(f);
    t.assert.strictEqual(payload.exp, undefined);
});

test('it signs a message that is consistent with panva/paseto', async (t: TestContext) => {
    const token = sign(PANVA_KEYS.secretKey, PANVA_MESSAGE, {
        addExp: false,
        addIat: false,
    });
    const splitToken = token.split('.');
    t.assert.strictEqual(splitToken.length, 3);
    t.assert.strictEqual(splitToken[0], 'v4');
    t.assert.strictEqual(splitToken[1], 'public');
    t.assert.strictEqual(token, PANVA_TOKEN);
});

test('it signs a message with a footer', async (t: TestContext) => {
    const footer = 'some footer';
    const token = sign(keys.secretKey, MESSAGE, {
        footer
    });
    const splitToken = token.split('.');
    t.assert.strictEqual(splitToken.length, 4);
    t.assert.strictEqual(splitToken[0], 'v4');
    t.assert.strictEqual(splitToken[1], 'public');
});

test('it signs a message with a footer and an assertion', async (t: TestContext) => {
    const footer = 'some footer';
    const token = sign(keys.secretKey, MESSAGE, {
        footer,
        assertion: 'some assertion'
    });
    const splitToken = token.split('.');
    t.assert.strictEqual(splitToken.length, 4);
    t.assert.strictEqual(splitToken[0], 'v4');
    t.assert.strictEqual(splitToken[1], 'public');
});

//
// Footer
//

test('it throws if footer is not a string, object or Uint8Array', async (t: TestContext) => {
    try {
        const token = sign(keys.secretKey, MESSAGE, {
            footer: 123 as any
        })
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof TypeError, true);
    }

    try {
        const token = sign(keys.secretKey, MESSAGE, {
            footer: true as any
        })
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof TypeError, true);
    }

    try {
        const token = sign(keys.secretKey, MESSAGE, {
            footer: [] as any
        })
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof TypeError, true);
    }

    try {
        const token = sign(keys.secretKey, MESSAGE, {
            footer: null as any
        })
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof TypeError, true);
    }
});

test('it throws if footer contains a wpk or kid claim thats invalid type', async (t: TestContext) => {
    try {
        const token = sign(keys.secretKey, MESSAGE, {
            footer: { wpk: 123 } as any
        })
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoClaimInvalid, true);
    }
    try {
        const token = sign(keys.secretKey, MESSAGE, { 
            footer: { kid: 123 } as any
        })
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof PasetoClaimInvalid, true);
    }
});

//
// Assertion
// 

test('it throws if assertion is not an object, string or Uint8Array', async (t: TestContext) => {

    try {
        const token = sign(keys.secretKey, MESSAGE, {
            assertion: [] as any
        })
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof TypeError, true);
    }

    try {
        const token = sign(keys.secretKey, MESSAGE, {
            assertion: null as any
        })
        t.assert.fail('should have thrown');
    } catch (err) {
        t.assert.strictEqual(err instanceof TypeError, true);
    }

});
