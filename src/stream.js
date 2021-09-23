import { pipeline } from 'stream';
import { promisify } from 'util';

import fs from 'fs';
import { Transform } from 'stream';
import { coding } from './caesarCipher.js';

const pipelineAsync = promisify(pipeline);

const transformData = (shift) => {
  return new Transform({
    transform(chunk, encoding, cb) {
      let result = coding(chunk.toString(), shift);
      this.push('result: ' + result + '\n');
      cb();
    },
  });
};

export const runStream = async (input, output, shift, action) => {
  await pipelineAsync(
    fs.createReadStream(input),
    transformData(action === 'encode' ? shift : -shift),
    fs.createWriteStream(output, { flags: 'a' }),
  );
};
