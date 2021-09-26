import { pipeline } from 'stream';
import { promisify } from 'util';

import fs from 'fs';
import { Transform } from 'stream';
import { coding } from './caesarCipher.js';
import { throws } from 'assert';

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

export const validateFileExisting = async (input, output) => {
  if (input) {
    await new Promise((resolve, reject) => {
      fs.access(input, fs.constants.F_OK, (err) => {
        if (err) {
          reject(err);
        } else resolve();
      });
    });
  }
  if (output) {
    await new Promise((resolve, reject) =>
      fs.access(output, fs.constants.F_OK, (err) => {
        if (err) {
          reject(err);
        } else resolve();
      }),
    );
  }
};

export const runStream = async (input, output, shift, action) => {
  let readStream, writeStream;
  if (input) {
    readStream = fs.createReadStream(input, () => {});
  } else {
    readStream = process.stdin;
  }
  if (output) {
    writeStream = fs.createWriteStream(output, {
      flags: 'a',
      encoding: 'utf-8',
    });
  } else {
    writeStream = process.stdout;
  }
  await pipelineAsync(
    readStream,
    transformData(action === 'encode' ? shift : -shift),
    writeStream,
  );
};
