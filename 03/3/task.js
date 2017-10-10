/**
 * Реализовать функцию, поведение которой аналогично поведению Promise.all,
 * которая возвращает в качестве результата rejected промис c первым reject value или resolve с массивом resolveValues,
 * в соответствущих исходному массиву промисов позициях, если не было ни одного промиса с reject.
 * @param {Array<Promise>} promises - массив с исходными промисами
 * @return {Promise}
 */
function promiseAll(promises) {
  const resolveValues = [];

  // Начинаем с уже ресолвнутого промиса, присваивая на каждом шаге промис,
  // который будет вернут при ресолве. 
  let myPromise = Promise.resolve('someValue');

  for (let promise of promises) {
    myPromise = myPromise.then(
      value => { return promise; }
    ).then(
      value => { resolveValues.push(value); }
      // Если был совершен реджект, то наш промис останется с тем же реджектом,
      // с которым был текущий промис(потому что значение текущего(текущее значение summed)
      // промиса установилось в значение, текущего(текущего по итерациям) промиса из массива).
      // Причем потом он не перепишется, потому что:
      // "Когда промис переходит в состояние «выполнен» – с результатом (resolve)
      // или ошибкой (reject) – это навсегда."
    );
  }

  // Если мы не реджектнули myPromise в цикле, то вернем промис,
  // возвращающий массив при ресолве. 
  return myPromise.then(
    value => { return resolveValues; }
  );
}

module.exports = promiseAll;
