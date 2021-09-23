import { Command } from 'commander';
import { coding } from './caesarCipher.js';
import { runStream } from './stream.js';

const program = new Command();
program.version('0,0,1');

const parseAction = (action) => {
  if (action !== 'encode' || action !== 'decode') {
    console.log('action must be encode or decode');
    process.stderr;
  }
  return action;
};
const parseShift = (shift) => {
  console.log(shift);
  return shift;
};

program
  .option(
    '-a, --action <decode, encode>',
    'action type enum: encode/decode',
    parseAction,
  )
  .option('-s, --shift <number>', 'shift type number', parseShift)
  .option('-i, --input <text>', 'path input file')
  .option('-o, --output <text>', 'path output file');

program.parse();

const options = program.opts();
console.log(coding('A,B.?C D', 2), options);

if (options.input && options.output) {
  try {
    runStream(options.input, options.output, options.shift);
  } catch (err) {
    console.error(err.message);
  }
}
