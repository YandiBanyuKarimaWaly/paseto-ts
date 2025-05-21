import { parseTime, parseTimeString } from '../../src/lib/time';

import { test, type TestContext } from 'node:test';

test('parseTimeString throws with an invalid time string', (t: TestContext) => {
    t.assert.throws(() => parseTimeString('foo'));
});

test('parseTime throws with an invalid time', (t: TestContext) => {
    t.assert.throws(() => parseTime('foo' as any));
});

test('parses a time from an ISO string', (t: TestContext) => {
    const b = '2023-01-09T15:34:46.865Z';
    const result = parseTime(b);
    const d = new Date(b);
    t.assert.strictEqual(typeof result, 'object');
    t.assert.strictEqual(result instanceof Date, true);
    t.assert.strictEqual(result.getTime(), d.getTime());
});

test('parses a time from a number', (t: TestContext) => {
    const result = parseTime(1631104486865);
    t.assert.strictEqual(typeof result, 'object');
    t.assert.strictEqual(result instanceof Date, true);
    t.assert.strictEqual(result.getTime() - 1631104486865 < 1000, true);
});

test('parses a time from a Date object', (t: TestContext) => {
    const result = parseTime(new Date(1631104486865));
    t.assert.strictEqual(typeof result, 'object');
    t.assert.strictEqual(result instanceof Date, true);
    t.assert.strictEqual(result.getTime() - 1631104486865 < 1000, true);
});

test('parses a time from a time string (1s 1sec 1secs 1second 1seconds, 1 s 1 sec 1 secs 1 second 1 seconds)', (t: TestContext) => {

    const result = parseTime('1s');
    t.assert.strictEqual(typeof result, 'object');
    t.assert.strictEqual(result instanceof Date, true);
    t.assert.strictEqual(result.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result2 = parseTime('1sec');
    t.assert.strictEqual(typeof result2, 'object');
    t.assert.strictEqual(result2 instanceof Date, true);
    t.assert.strictEqual(result2.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result3 = parseTime('1secs');
    t.assert.strictEqual(typeof result3, 'object');
    t.assert.strictEqual(result3 instanceof Date, true);
    t.assert.strictEqual(result3.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result4 = parseTime('1second');
    t.assert.strictEqual(typeof result4, 'object');
    t.assert.strictEqual(result4 instanceof Date, true);
    t.assert.strictEqual(result4.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result5 = parseTime('1seconds');
    t.assert.strictEqual(typeof result5, 'object');
    t.assert.strictEqual(result5 instanceof Date, true);
    t.assert.strictEqual(result5.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result6 = parseTime('1 s');
    t.assert.strictEqual(typeof result6, 'object');
    t.assert.strictEqual(result6 instanceof Date, true);
    t.assert.strictEqual(result6.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result7 = parseTime('1 sec');
    t.assert.strictEqual(typeof result7, 'object');
    t.assert.strictEqual(result7 instanceof Date, true);
    t.assert.strictEqual(result7.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result8 = parseTime('1 secs');
    t.assert.strictEqual(typeof result8, 'object');
    t.assert.strictEqual(result8 instanceof Date, true);
    t.assert.strictEqual(result8.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result9 = parseTime('1 second');
    t.assert.strictEqual(typeof result9, 'object');
    t.assert.strictEqual(result9 instanceof Date, true);
    t.assert.strictEqual(result9.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result10 = parseTime('1 seconds');
    t.assert.strictEqual(typeof result10, 'object');
    t.assert.strictEqual(result10 instanceof Date, true);
    t.assert.strictEqual(result10.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

});

test('parses a time from a time string (1m 1min 1mins 1minute 1minutes, 1 m 1 min 1 mins 1 minute 1 minutes)', (t: TestContext) => {

    const result = parseTime('1m');
    t.assert.strictEqual(typeof result, 'object');
    t.assert.strictEqual(result instanceof Date, true);
    t.assert.strictEqual(result.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result2 = parseTime('1min');
    t.assert.strictEqual(typeof result2, 'object');
    t.assert.strictEqual(result2 instanceof Date, true);
    t.assert.strictEqual(result2.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result3 = parseTime('1mins');
    t.assert.strictEqual(typeof result3, 'object');
    t.assert.strictEqual(result3 instanceof Date, true);
    t.assert.strictEqual(result3.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result4 = parseTime('1minute');
    t.assert.strictEqual(typeof result4, 'object');
    t.assert.strictEqual(result4 instanceof Date, true);
    t.assert.strictEqual(result4.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result5 = parseTime('1minutes');
    t.assert.strictEqual(typeof result5, 'object');
    t.assert.strictEqual(result5 instanceof Date, true);
    t.assert.strictEqual(result5.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result6 = parseTime('1 m');
    t.assert.strictEqual(typeof result6, 'object');
    t.assert.strictEqual(result6 instanceof Date, true);
    t.assert.strictEqual(result6.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result7 = parseTime('1 min');
    t.assert.strictEqual(typeof result7, 'object');
    t.assert.strictEqual(result7 instanceof Date, true);
    t.assert.strictEqual(result7.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result8 = parseTime('1 mins');
    t.assert.strictEqual(typeof result8, 'object');
    t.assert.strictEqual(result8 instanceof Date, true);
    t.assert.strictEqual(result8.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result9 = parseTime('1 minute');
    t.assert.strictEqual(typeof result9, 'object');
    t.assert.strictEqual(result9 instanceof Date, true);
    t.assert.strictEqual(result9.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result10 = parseTime('1 minutes');
    t.assert.strictEqual(typeof result10, 'object');
    t.assert.strictEqual(result10 instanceof Date, true);
    t.assert.strictEqual(result10.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

});

test('parses a time from a time string (1h 1hr 1hrs 1hour 1hours, 1 h 1 hr 1 hrs 1 hour 1 hours)', (t: TestContext) => {

    const result = parseTime('1h');
    t.assert.strictEqual(typeof result, 'object');
    t.assert.strictEqual(result instanceof Date, true);
    t.assert.strictEqual(result.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result2 = parseTime('1hr');
    t.assert.strictEqual(typeof result2, 'object');
    t.assert.strictEqual(result2 instanceof Date, true);
    t.assert.strictEqual(result2.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result3 = parseTime('1hrs');
    t.assert.strictEqual(typeof result3, 'object');
    t.assert.strictEqual(result3 instanceof Date, true);
    t.assert.strictEqual(result3.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result4 = parseTime('1hour');
    t.assert.strictEqual(typeof result4, 'object');
    t.assert.strictEqual(result4 instanceof Date, true);
    t.assert.strictEqual(result4.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result5 = parseTime('1hours');
    t.assert.strictEqual(typeof result5, 'object');
    t.assert.strictEqual(result5 instanceof Date, true);
    t.assert.strictEqual(result5.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result6 = parseTime('1 h');
    t.assert.strictEqual(typeof result6, 'object');
    t.assert.strictEqual(result6 instanceof Date, true);
    t.assert.strictEqual(result6.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result7 = parseTime('1 hr');
    t.assert.strictEqual(typeof result7, 'object');
    t.assert.strictEqual(result7 instanceof Date, true);
    t.assert.strictEqual(result7.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result8 = parseTime('1 hrs');
    t.assert.strictEqual(typeof result8, 'object');
    t.assert.strictEqual(result8 instanceof Date, true);
    t.assert.strictEqual(result8.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result9 = parseTime('1 hour');
    t.assert.strictEqual(typeof result9, 'object');
    t.assert.strictEqual(result9 instanceof Date, true);
    t.assert.strictEqual(result9.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result10 = parseTime('1 hours');
    t.assert.strictEqual(typeof result10, 'object');
    t.assert.strictEqual(result10 instanceof Date, true);
    t.assert.strictEqual(result10.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

});

test('parses a time from a time string (1d 1day 1days, 1 d 1 day 1 days)', (t: TestContext) => {

    const result = parseTime('1d');
    t.assert.strictEqual(typeof result, 'object');
    t.assert.strictEqual(result instanceof Date, true);
    t.assert.strictEqual(result.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result2 = parseTime('1day');
    t.assert.strictEqual(typeof result2, 'object');
    t.assert.strictEqual(result2 instanceof Date, true);
    t.assert.strictEqual(result2.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result3 = parseTime('1days');
    t.assert.strictEqual(typeof result3, 'object');
    t.assert.strictEqual(result3 instanceof Date, true);
    t.assert.strictEqual(result3.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result4 = parseTime('1 d');
    t.assert.strictEqual(typeof result4, 'object');
    t.assert.strictEqual(result4 instanceof Date, true);
    t.assert.strictEqual(result4.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result5 = parseTime('1 day');
    t.assert.strictEqual(typeof result5, 'object');
    t.assert.strictEqual(result5 instanceof Date, true);
    t.assert.strictEqual(result5.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

    const result6 = parseTime('1 days');
    t.assert.strictEqual(typeof result6, 'object');
    t.assert.strictEqual(result6 instanceof Date, true);
    t.assert.strictEqual(result6.getTime() - Date.now() - 1000 * 60 * 60 * 24 < 1000, true);

});

test('parses a time from a time string (1w 1wk 1wks 1week 1weeks, 1 w 1 wk 1 wks 1 week 1 weeks)', (t: TestContext) => {

    const result = parseTime('1w');
    t.assert.strictEqual(typeof result, 'object');
    t.assert.strictEqual(result instanceof Date, true);
    t.assert.strictEqual(result.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 7 < 1000, true);

    const result2 = parseTime('1wk');
    t.assert.strictEqual(typeof result2, 'object');
    t.assert.strictEqual(result2 instanceof Date, true);
    t.assert.strictEqual(result2.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 7 < 1000, true);

    const result3 = parseTime('1wks');
    t.assert.strictEqual(typeof result3, 'object');
    t.assert.strictEqual(result3 instanceof Date, true);
    t.assert.strictEqual(result3.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 7 < 1000, true);

    const result4 = parseTime('1week');
    t.assert.strictEqual(typeof result4, 'object');
    t.assert.strictEqual(result4 instanceof Date, true);
    t.assert.strictEqual(result4.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 7 < 1000, true);

    const result5 = parseTime('1weeks');
    t.assert.strictEqual(typeof result5, 'object');
    t.assert.strictEqual(result5 instanceof Date, true);
    t.assert.strictEqual(result5.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 7 < 1000, true);

    const result6 = parseTime('1 w');
    t.assert.strictEqual(typeof result6, 'object');
    t.assert.strictEqual(result6 instanceof Date, true);
    t.assert.strictEqual(result6.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 7 < 1000, true);

    const result7 = parseTime('1 wk');
    t.assert.strictEqual(typeof result7, 'object');
    t.assert.strictEqual(result7 instanceof Date, true);
    t.assert.strictEqual(result7.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 7 < 1000, true);

    const result8 = parseTime('1 wks');
    t.assert.strictEqual(typeof result8, 'object');
    t.assert.strictEqual(result8 instanceof Date, true);
    t.assert.strictEqual(result8.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 7 < 1000, true);

    const result9 = parseTime('1 week');
    t.assert.strictEqual(typeof result9, 'object');
    t.assert.strictEqual(result9 instanceof Date, true);
    t.assert.strictEqual(result9.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 7 < 1000, true);

    const result10 = parseTime('1 weeks');
    t.assert.strictEqual(typeof result10, 'object');
    t.assert.strictEqual(result10 instanceof Date, true);
    t.assert.strictEqual(result10.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 7 < 1000, true);

});

test('parses a time from a time string (1mo 1mos 1month 1months, 1 mo 1 mos 1 month 1 months)', (t: TestContext) => {

    const result = parseTime('1mo');
    t.assert.strictEqual(typeof result, 'object');
    t.assert.strictEqual(result instanceof Date, true);
    t.assert.strictEqual(result.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 30 < 1000, true);

    const result2 = parseTime('1mos');
    t.assert.strictEqual(typeof result2, 'object');
    t.assert.strictEqual(result2 instanceof Date, true);
    t.assert.strictEqual(result2.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 30 < 1000, true);

    const result3 = parseTime('1month');
    t.assert.strictEqual(typeof result3, 'object');
    t.assert.strictEqual(result3 instanceof Date, true);
    t.assert.strictEqual(result3.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 30 < 1000, true);

    const result4 = parseTime('1months');
    t.assert.strictEqual(typeof result4, 'object');
    t.assert.strictEqual(result4 instanceof Date, true);
    t.assert.strictEqual(result4.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 30 < 1000, true);

    const result5 = parseTime('1 mo');
    t.assert.strictEqual(typeof result5, 'object');
    t.assert.strictEqual(result5 instanceof Date, true);
    t.assert.strictEqual(result5.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 30 < 1000, true);

    const result6 = parseTime('1 mos');
    t.assert.strictEqual(typeof result6, 'object');
    t.assert.strictEqual(result6 instanceof Date, true);

    const result7 = parseTime('1 month');
    t.assert.strictEqual(typeof result7, 'object');
    t.assert.strictEqual(result7 instanceof Date, true);
    t.assert.strictEqual(result7.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 30 < 1000, true);

    const result8 = parseTime('1 months');
    t.assert.strictEqual(typeof result8, 'object');
    t.assert.strictEqual(result8 instanceof Date, true);
    t.assert.strictEqual(result8.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 30 < 1000, true);

});

test('parses a time from a time string (1y 1yr 1yrs 1year 1years, 1 y 1 yr 1 yrs 1 year 1 years)', (t: TestContext) => {

    const result = parseTime('1y');
    t.assert.strictEqual(typeof result, 'object');
    t.assert.strictEqual(result instanceof Date, true);
    t.assert.strictEqual(result.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 365 < 1000, true);

    const result2 = parseTime('1yr');
    t.assert.strictEqual(typeof result2, 'object');
    t.assert.strictEqual(result2 instanceof Date, true);
    t.assert.strictEqual(result2.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 365 < 1000, true);

    const result3 = parseTime('1yrs');
    t.assert.strictEqual(typeof result3, 'object');
    t.assert.strictEqual(result3 instanceof Date, true);
    t.assert.strictEqual(result3.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 365 < 1000, true);

    const result4 = parseTime('1year');
    t.assert.strictEqual(typeof result4, 'object');
    t.assert.strictEqual(result4 instanceof Date, true);
    t.assert.strictEqual(result4.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 365 < 1000, true);

    const result5 = parseTime('1years');
    t.assert.strictEqual(typeof result5, 'object');
    t.assert.strictEqual(result5 instanceof Date, true);
    t.assert.strictEqual(result5.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 365 < 1000, true);

    const result6 = parseTime('1 y');
    t.assert.strictEqual(typeof result6, 'object');
    t.assert.strictEqual(result6 instanceof Date, true);
    t.assert.strictEqual(result6.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 365 < 1000, true);

    const result7 = parseTime('1 yr');
    t.assert.strictEqual(typeof result7, 'object');
    t.assert.strictEqual(result7 instanceof Date, true);
    t.assert.strictEqual(result7.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 365 < 1000, true);

    const result8 = parseTime('1 yrs');
    t.assert.strictEqual(typeof result8, 'object');
    t.assert.strictEqual(result8 instanceof Date, true);
    t.assert.strictEqual(result8.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 365 < 1000, true);

    const result9 = parseTime('1 year');
    t.assert.strictEqual(typeof result9, 'object');
    t.assert.strictEqual(result9 instanceof Date, true);
    t.assert.strictEqual(result9.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 365 < 1000, true);

    const result10 = parseTime('1 years');
    t.assert.strictEqual(typeof result10, 'object');
    t.assert.strictEqual(result10 instanceof Date, true);
    t.assert.strictEqual(result10.getTime() - Date.now() - 1000 * 60 * 60 * 24 * 365 < 1000, true);

});

test('it throws if date is not a string, number or date', (t: TestContext) => {
    
    t.assert.throws(() => parseTime({} as any), 'date must be a string, number or date');
    t.assert.throws(() => parseTime([] as any), 'date must be a string, number or date');
    t.assert.throws(() => parseTime((() => {}) as any), 'date must be a string, number or date');
    t.assert.throws(() => parseTime(undefined as any), 'date must be a string, number or date');
    t.assert.throws(() => parseTime(null as any), 'date must be a string, number or date');
    t.assert.throws(() => parseTime(true as any), 'date must be a string, number or date');
    t.assert.throws(() => parseTime(false as any), 'date must be a string, number or date');
    t.assert.throws(() => parseTime(NaN as any), 'date must be a string, number or date');
    t.assert.throws(() => parseTime(Infinity as any), 'date must be a string, number or date');
    t.assert.throws(() => parseTime(-Infinity as any), 'date must be a string, number or date');
    t.assert.throws(() => parseTime(Symbol('') as any), 'date must be a string, number or date');
    t.assert.throws(() => parseTime(new Map() as any), 'date must be a string, number or date');
    t.assert.throws(() => parseTime(new Set() as any), 'date must be a string, number or date');
    t.assert.throws(() => parseTime(new WeakMap() as any), 'date must be a string, number or date');
    t.assert.throws(() => parseTime(new WeakSet() as any), 'date must be a string, number or date');
    t.assert.throws(() => parseTime(new ArrayBuffer(0) as any), 'date must be a string, number or date');

});

