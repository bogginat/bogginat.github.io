/**
 * Исправьте проблему с таймером: должны выводиться числа от 0 до 9.
 * Доп. задание: предложите несколько вариантов решения.
 */
function timer(logger = console.log) {
  function makeLogAndTouchNext() {
    logger(Number(this));
  }

  for (var i = 0; i < 10; i++) {
    let bindedFunc = makeLogAndTouchNext.bind(i);

    setTimeout(() => {
      bindedFunc();
    }, 100);
  }
}

/*= ============================================ */

/**
 * Создайте собственную реализацию функции bind
 * @param {Function} func передаваемая функция
 * @param {any} context контекст
 * @param {Array<any>} args массив аргументов
 * @return {Function} функция с нужным контекстом
 */
function customBind(func, context, ...args) {
  function bindedFunc(...additionalArgs) {
    return func.apply(context, args.concat(additionalArgs));
  }

  return bindedFunc;
}

/*= ============================================ */

/**
 * Напишите функцию sum, вычисляющую суммы подобным образом:
 * sum(1)(2)( ) // 3
 * sum(1)(2)(3)( ) // 6
 * sum :: Number -> sum
 * sum :: void -> Number
 */
function sum(x) {
  let cur = x;

  if (!x && x !== 0) {
    return 0;
  }
  /**
   * Возвращает сумму или функцию, вычисляющую сумму.
   * @param {number?} y
   * @return {Function|number}
   */
  function returningFunc(y) {
    if (!(y || y === 0)) {
      return cur;
    }
    cur += y;
    return returningFunc;
  }

  return returningFunc;
}
/*= ============================================ */

/**
 * Определите, являются ли строчки анаграммами (например, “просветитель” — “терпеливость”).
 * @param {string} first
 * @param {string} second
 * @return {boolean}
 */
function anagram(first, second) {
  // Насколько я знаю, объекты в js работают примерно как хеш таблицы,
  // поэтому такая проверка будет быстрее, чем отсортить и сравнить.
  const counterFirst = {};
  const counterSecond = {};

  for (let letter of first) {
    counterFirst[letter] = counterFirst[letter] || 0;
    counterFirst[letter] += 1;
  }
  for (let letter of second) {
    counterSecond[letter] = counterSecond[letter] || 0;
    counterSecond[letter] += 1;
  }
  const keysInFirstCounter = Object.keys(counterFirst);

  if (keysInFirstCounter.length !== Object.keys(counterSecond).length) {
    return false;
  }
  for (let letter of keysInFirstCounter) {
    if (counterFirst[letter] !== counterSecond[letter]) {
      return false;
    }
  }
  return true;
}

/*= ============================================ */

/**
 * @param {number} a
 * @param {number} b
 * @return {boolean}
 */
function comparator(a, b) {
  return a - b;
}

/**
 * Сократите массив до набора уникальных значений
 * [1,1, 2, 6, 3, 6, 2] → [1, 2, 3, 6]
 * @param {Array<number>} исходный массив
 * @return {Array<number>} массив уникальных значений, отсортированный по возрастанию
 */
function getUnique(arr) {
  let counter = {};
  let ans = [];

  for (let num of arr) {
    if (!counter[num]) {
      counter[num] = true;
      ans.push(num);
    }
  }
  return ans.sort(comparator);
}

/*= ============================================ */

/**
 * Найдите пересечение двух массивов
 * [1, 3, 5, 7, 9] и [1, 2, 3, 4] → [1, 3]
 * @param {Array<number>, Array<number>} first, second исходные массивы
 * @return {Array<number>} массив значений, отсортированный по возрастанию
 */
function getIntersection(first, second) {
  const firstSorted = first.sort(comparator);
  const secondSorted = second.sort(comparator);
  let i = 0;
  let j = 0;
  let ans = [];

  while (i < firstSorted.length && j < secondSorted.length) {
    if (firstSorted[i] < secondSorted[j]) {
      ++i;
    } else if (firstSorted[i] > secondSorted[j]) {
      ++j;
    } else {
      ans.push(firstSorted[i]);
      ++i;
      ++j;
    }
  }
  return ans;
}

/* ============================================= */

/**
 * Две строки называются изоморфными, когда в строке A можно заменить
 * конкретный символ на любой другой для получения строки B. (Расстояние Левенштейна, при возможных мутациях
 * ограничивающихся заменой символа - отличается на 1).
 * Отдельно стоит отметить что строка изоморфна самой себе.
 * Порядок символов должен остаться неизменным. Каждый
 * последовательный символ в строке A сравнивается с
 * каждым последовательным символов в строке B.
 *
 * @param  {string} left
 * @param  {string} right
 * @return {boolean}
 */
function isIsomorphic(left, right) {
  let counter = 0;
  const length = Math.min(left.length, right.length);

  if (Math.abs(left.length - right.length) > 1) {
    return false;
  }
  // Даем запас на 1 символ, в случае, если строки идентичны,
  // но одна из них имеет один доп символ.
  for (let i = 0; i <= length; ++i) {
    if (left[i] !== right[i]) {
      ++counter;
      if (counter > 1) {
        return false;
      }
    }
  }
  return true;
}

module.exports = {
  timer,
  customBind,
  sum,
  anagram,
  getUnique,
  getIntersection,
  isIsomorphic
};