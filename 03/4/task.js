/**
 * Реализовать функцию, поведение которой аналогично поведению Promise.race,
 * которая возвращает в качестве результата промис c первым resolve value или reject value в массиве исходных промисов
 * @param {Array<Promise>} promises - массив с исходными промисами
 * @return {Promise}
 */

function promiseRace(promises) {
  const myPromise = new Promise((resolve, reject) => {
    for (const promise of promises) {
      // Так можно, потому что: "Когда промис переходит в состояние «выполнен» –
      // с результатом (resolve) или ошибкой (reject) – это навсегда."
      promise.then(resolve, reject);
    }
  });

  return myPromise;
}

module.exports = promiseRace;
