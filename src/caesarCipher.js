export const coding = (text, shift) => {
  const arrOfText = text.split('').map((char) => char.charCodeAt(0));
  const encodingArr = [];
  for (let i = 0; i < arrOfText.length; i++) {
    let char = decodeChar(arrOfText[i], shift);
    encodingArr.push(String.fromCharCode(char));
  }
  return encodingArr.join('');
};

const decodeChar = (letter, shift) => {
  let char;
  if (letter >= 65 && letter <= 90) {
    char = calcNewUpperChar(letter, shift);
  } else if (letter >= 97 && letter <= 122) {
    char = calcNewLowerChar(letter, shift);
  } else char = letter;

  return char;
};

const calcNewUpperChar = (letter, shift) => {
  const newChar = (letter - 65 + shift) % 26;
  const result = (newChar < 0 ? 91 : 65) + newChar;
  return result;
};

const calcNewLowerChar = (letter, shift) => {
  const newChar = (letter - 97 + shift) % 26;
  const result = (newChar < 0 ? 123 : 97) + newChar;
  return result;
};
