'use strict';

(function () {
  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var wizardCoatInput = document.querySelector('input[name = coat-color]');
  var wizardEyesInput = document.querySelector('input[name = eyes-color]');

  var coatColor;
  var eyesColor;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  wizardCoat.addEventListener('click', function () {
    var randomColor = window.util.getRandomNumber(0, window.util.coatColors.length);
    var newColor = window.util.coatColors[randomColor];
    wizardCoatInput.value = newColor;
    wizardCoat.style.fill = newColor;
    coatColor = newColor;
    updateWizards();
  });

  wizardEyes.addEventListener('click', function () {
    var randomColor = window.util.getRandomNumber(0, window.util.eyesColors.length);
    var newColor = window.util.eyesColors[randomColor];
    wizardEyesInput.value = newColor;
    wizardEyes.style.fill = newColor;
    eyesColor = newColor;
    updateWizards();
  });

  var onGetSuccess = function (data) {
    wizards = data;
    updateWizards();
  };

  window.backend.load(onGetSuccess, window.backend.onError);
})();
