function maskControl(event) {
  let phoneInput = document.getElementById('phone__input');
  let curValue = phoneInput.value;
  let resultValue = '';

  if (curValue.length > 17) {
    curValue = curValue.slice(0, 17);
  }
  phoneInput.value = resultValue;
  console.log(event);
  console.log(curValue);
}

module.exports = { maskControl };

