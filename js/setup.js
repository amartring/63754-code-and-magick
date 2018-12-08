'use strict';

(function () {
  var SETUP_BLOCK_INITIAL_COORDS = {
    top: '80px',
    left: '50%'
  };
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setupBlockOpen = document.querySelector('.setup-open');
  var setupBlockClose = window.util.setupBlock.querySelector('.setup-close');
  var setupBlockSubmit = window.util.setupBlock.querySelector('.setup-submit');

  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');
  var wizardCoatInput = document.querySelector('input[name = coat-color]');
  var wizardEyesInput = document.querySelector('input[name = eyes-color]');
  var wizardfireballInput = document.querySelector('input[name = fireball-color]');

  window.util.setupBlock.querySelector('.setup-similar').classList.remove('hidden');

  var setSetupBlockInitialCoords = function () {
    window.util.setupBlock.style.top = SETUP_BLOCK_INITIAL_COORDS.top;
    window.util.setupBlock.style.left = SETUP_BLOCK_INITIAL_COORDS.left;
  };

  var openPopup = function () {
    setSetupBlockInitialCoords();
    window.util.setupBlock.classList.remove('hidden');
    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, openPopup);
    });
  };

  var closePopup = function () {
    window.util.setupBlock.classList.add('hidden');
    document.removeEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, closePopup);
    });
  };

  var submitForm = function () {
    setupBlockSubmit.setAttribute('type', 'submit');
  };

  var randomColorOfSmth = function (attribute, array, input) {
    var randomColor = window.util.getRandomNumber(0, array.length);
    input.setAttribute('value', array[randomColor]);
    return attribute + ': ' + array[randomColor];
  };

  setupBlockOpen.addEventListener('click', openPopup);

  setupBlockOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupBlockClose.addEventListener('click', closePopup);

  setupBlockClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  setupBlockSubmit.addEventListener('click', submitForm);

  setupBlockSubmit.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, submitForm);
  });

  wizardCoat.addEventListener('click', function () {
    wizardCoat.setAttribute('style', randomColorOfSmth('fill', window.util.coatColors, wizardCoatInput));
  });

  wizardEyes.addEventListener('click', function () {
    wizardEyes.setAttribute('style', randomColorOfSmth('fill', window.util.eyesColors, wizardEyesInput));
  });

  fireball.addEventListener('click', function () {
    fireball.setAttribute('style', randomColorOfSmth('background-color', fireballColors, wizardfireballInput));
  });
})();
