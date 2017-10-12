/**
 * Изменить поведение чисел таким образом, чтобы указанные конструкции были эквивалетны при условии,
 * что римские цифры могут быть любыми.
 * 0..V => [0, 1, 2, 3, 4]
 * 0..VII => [0, 1, 2, 3, 4, 5, 6]
 * 0..X => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * Подсказка - необходимо использовать Proxy - объекты
 * */

// Я очень хотела сделать это функцией, то так и не поняла как
// и как заставить эту функцию корректно работать, поэтому сделала
// без функции.

/*
 * @param {string} str
 * @return {number} num
 */
function getArabicNumber(str) {
  let curPos = 0;
  let finalValue = 0;

  while (curPos < str.length) {
    for (const key in numsConvert) {
      const numLength = key.length;

      if (str.substr(curPos, numLength) === key) {
        finalValue += numsConvert[key];
        curPos += numLength;
        break;
      }
    }
  }

  return finalValue;
}

const numsConvert = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1
};
const myProto = Object.getPrototypeOf(Number.prototype);
const myProxy = new Proxy(myProto,
  {
    get(obj, prop) {
      let finalValue = 0;
      const ansArr = [];

      if (prop in numsConvert) {
        finalValue = numsConvert[prop];
      } else if (prop[0] in numsConvert) {
        finalValue = getArabicNumber(prop);
      }
      for (let i = 0; i < finalValue; ++i) {
        ansArr.push(i);
      }
      return ansArr;
    }
  });

Object.setPrototypeOf(Number.prototype, myProxy);
