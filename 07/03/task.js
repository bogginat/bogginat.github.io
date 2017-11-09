function throttle(time, callback) {
  let running = true;

  return function() {
    if (running) {
      callback();
      running = false;
      setTimeout(function() {
        running = true;
      }, time);
    }
  };
}

module.exports = { throttle };
