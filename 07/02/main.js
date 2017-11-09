let prevClickTime;
let curClickTime;

function myDoubleClickHandler() {
  let newLi = document.createElement('LI');
  let textInLi = document.createTextNode('2xClick - '
    + curClickTime.format('ddd MMM DD YYYY HH:mm:ss'));

  newLi.appendChild(textInLi);
  document.getElementById('list_of_clicks').appendChild(newLi);
}
function doubleClick(element, doubleClickHandler, timeDistance) {
  if (!curClickTime) {
    curClickTime = moment();
    return;
  }
  prevClickTime = curClickTime;
  curClickTime = moment();
  console.log(curClickTime.format('ddd MMM DD YYYY HH:mm:ss'));
  console.log(prevClickTime.format('ddd MMM DD YYYY HH:mm:ss'));
  if (curClickTime.valueOf() - prevClickTime.valueOf()
    <= timeDistance) {
    doubleClickHandler();
  }
}

module.exports = { myDoubleClickHandler, doubleClick };
