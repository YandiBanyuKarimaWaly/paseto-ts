import { assertJsonStringSize, countKeys, getJsonDepth, returnPossibleJson } from '../../src/lib/json';

import { test, type TestContext } from 'node:test';

const JSON_DEPTH_6 = {
    a: {
        b: {
            c: {
                d: {
                    e: 1
                }
            }
        }
    }
}

const json = '{"a":1,"b":2,"c":3,"d":4,"e":5,"f":6,"g":7,"h":8,"i":9,"j":10,"k":11,"l":12,"m":13,"n":14,"o":15,"p":16,"q":17,"r":18,"s":19,"t":20,"u":21,"v":22,"w":23,"x":24,"y":25,"z":26}';

test('it returns the correct depth of a JSON string', (t: TestContext) => {
    const depth = getJsonDepth(JSON.stringify(JSON_DEPTH_6));
    t.assert.strictEqual(depth, 6);
});

test('it returns the correct number of keys in a JSON string', (t: TestContext) => {
    const keys = countKeys(json);
    t.assert.strictEqual(keys, 27);
});

test('it throws an error if the JSON string is too deep', (t: TestContext) => {
    t.assert.throws(() => assertJsonStringSize(JSON.stringify(JSON_DEPTH_6), { maxDepth: 5, maxKeys: 100 }));
});

test('it throws an error if the JSON string has too many keys', (t: TestContext) => {
    t.assert.throws(() => assertJsonStringSize(json, { maxDepth: 100, maxKeys: 25 }));
});

test('it throws if the input is not JSON', (t: TestContext) => {
    t.assert.throws(() => assertJsonStringSize(123 as any, { maxDepth: 100, maxKeys: 100 }));
});

test('returnPossibleJson returns the input as json if it is a json string', (t: TestContext) => {
    const json = '{"a":1,"b":2,"c":3,"d":4,"e":5,"f":6,"g":7,"h":8,"i":9,"j":10,"k":11,"l":12,"m":13,"n":14,"o":15,"p":16,"q":17,"r":18,"s":19,"t":20,"u":21,"v":22,"w":23,"x":24,"y":25,"z":26}';
    const result = returnPossibleJson(json);
    t.assert.deepStrictEqual(result, JSON.parse(json));
});

test('returnPossibleJson returns an empty string if the input is undefined', (t: TestContext) => {
    const result = returnPossibleJson(undefined as any);
    t.assert.strictEqual(result, '');
});

test('assertJsonStringSize skips if maxDepth and maxKeys is 0', (t: TestContext) => {
    assertJsonStringSize(json, { maxDepth: 0, maxKeys: 0 });
});
