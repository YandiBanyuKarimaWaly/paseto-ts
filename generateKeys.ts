import { generateKeys } from './src/v4';

console.info('----------------------------------');
console.info('type: local');
console.info(generateKeys('local'));
console.info()
console.info('----------------------------------');
console.info('type: public');
console.info(generateKeys('public'));