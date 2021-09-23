import commander from 'commander';
import process from 'process';
import { coding } from './caesarCipher.js';
import { runStream } from './stream.js';

const program = new commander.Command();
program.version('0,0,1');

const parseAction = (action) => {
  if (!(action === 'encode' || action === 'decode')) {
    throw new commander.InvalidArgumentError(
      'action must be "encode" or "decode"',
    );
  }
  return action;
};

const parseShift = (shift) => {
  if (isNaN(+shift)) {
    throw new commander.InvalidArgumentError('shift must be a number');
  }
  return shift;
};

program
  .requiredOption(
    '-a, --action <action>',
    'action type enum: encode/decode',
    parseAction,
  )
  .requiredOption('-s, --shift <number>', 'shift type number', parseShift)
  .option('-i, --input <text>', 'path input file')
  .option('-o, --output <text>', 'path output file');

program.parse();

const options = program.opts();

if (options.input && options.output) {
  try {
    runStream(options.input, options.output, options.shift, options.action);
  } catch (err) {
    console.error(err.message);
  }
}
