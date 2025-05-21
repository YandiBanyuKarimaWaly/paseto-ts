import { LE64, PAE } from '../../src/lib/pae';

import { stringToUint8Array } from '../../src/lib/uint8array';
import { test, type TestContext } from 'node:test';

test('it encodes LE64', (t: TestContext) => {
    const input = 123456789;
    const output = LE64(input);
    t.assert.strictEqual(output.byteLength, 8);
    t.assert.deepStrictEqual(output, new Uint8Array([ 0x15, 0xcd, 0x5b, 0x07, 0x00, 0x00, 0x00, 0x00 ]));
});

test('it encodes PAE', (t: TestContext) => {
    const input = [
        new Uint8Array([ 0x01, 0x02, 0x03, 0x04, 0x05 ]),
        new Uint8Array([ 0x06, 0x07, 0x08, 0x09, 0x0a ]),
        new Uint8Array([ 0x0b, 0x0c, 0x0d, 0x0e, 0x0f ]),
    ];
    const output = PAE(...input);
    t.assert.strictEqual(output.byteLength, 47);
    t.assert.deepStrictEqual(output, new Uint8Array([
        3,  0,  0, 0, 0, 0, 0, 0, 5,  0,  0,
        0,  0,  0, 0, 0, 1, 2, 3, 4,  5,  5,
        0,  0,  0, 0, 0, 0, 0, 6, 7,  8,  9,
        10, 5,  0, 0, 0, 0, 0, 0, 0, 11, 12,
        13, 14, 15
    ]));
});

test('PAE([]) will always return "\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00"', (t: TestContext) => {
    const input = [];
    const output = PAE(...input);
    t.assert.strictEqual(output.byteLength, 8);
    t.assert.deepStrictEqual(output, new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]));

});

test(`PAE(['']) will always return "\\x01\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00"`, (t: TestContext) => {
    const input2 = [stringToUint8Array('')];
    const output2 = PAE(...input2);
    t.assert.strictEqual(output2.byteLength, 16);
    t.assert.deepStrictEqual(output2, new Uint8Array([ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]));
});

test(`PAE(['test']) will always return "\\x01\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x04\\x00\\x00\\x00\\x00\\x00\\x00\\x00test"`, (t: TestContext) => {
    const input3 = [stringToUint8Array('test')];
    const output3 = PAE(...input3);
    t.assert.strictEqual(output3.byteLength, 20);
    t.assert.deepStrictEqual(output3, new Uint8Array([ 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0x74, 0x65, 0x73, 0x74 ]));
});

test(`PAE('test') will throw a TypeError`, (t: TestContext) => {
    t.assert.throws(() => {
        PAE('test' as any);
    }, TypeError);
});
    