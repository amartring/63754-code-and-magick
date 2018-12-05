'use strict';
(function () {

  var HANDLE_AVAILABILITY = {
    yes: 1,
    no: 0
  };
  var COORDS_UNITS = 'px';

  var setupBlock = document.querySelector('.setup');
  var dialogHandle = setupBlock.querySelector('.setup-user-pic');

  var calcStartCoords = function (evt) {
    return {
      x: evt.clientX,
      y: evt.clientY
    };
  };

  var calcShiftCoords = function (moveEvt, startCoords) {
    return {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
  };

  var calcNewCoords = function (shift) {
    setupBlock.style.top = (setupBlock.offsetTop - shift.y) + COORDS_UNITS;
    setupBlock.style.left = (setupBlock.offsetLeft - shift.x) + COORDS_UNITS;
  };

  var checkIsDragged = function (dragged) {
    if (dragged) {
      var onClickPreventDefault = function (evt) {
        evt.preventDefault();
        dialogHandle.removeEventListener('click', onClickPreventDefault);
      };
      dialogHandle.addEventListener('click', onClickPreventDefault);
    }
  };

  dialogHandle.style.zIndex = HANDLE_AVAILABILITY.yes;

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var dragged = false;
    dialogHandle.style.zIndex = HANDLE_AVAILABILITY.no;
    var startCoords = calcStartCoords(evt);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      dialogHandle.style.zIndex = HANDLE_AVAILABILITY.yes;
      var shift = calcShiftCoords(moveEvt, startCoords);
      startCoords = calcStartCoords(moveEvt);
      calcNewCoords(shift);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      checkIsDragged(dragged);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
