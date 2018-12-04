'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var WIZARDS_MAX_NUMBER = 4;

var setupBlock = document.querySelector('.setup');
var setupBlockOpen = document.querySelector('.setup-open');
var setupBlockClose = setupBlock.querySelector('.setup-close');
var setupBlockSubmit = setupBlock.querySelector('.setup-submit');

var setupWizard = document.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var fireball = document.querySelector('.setup-fireball-wrap');
var wizardCoatInput = document.querySelector('input[name = coat-color]');
var wizardEyesInput = document.querySelector('input[name = eyes-color]');
var wizardfireballInput = document.querySelector('input[name = fireball-color]');

var similarListElement = setupBlock.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var firstNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var secondNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var wizards = [];
var randomNames = [];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getWizardName = function () {
  for (var i = 0; i < WIZARDS_MAX_NUMBER; i++) {
    var randomFirstName = getRandomNumber(0, firstNames.length - 1);
    var randomSecondName = getRandomNumber(0, secondNames.length - 1);
    var name = firstNames[randomFirstName] + ' ' + secondNames[randomSecondName];
    randomNames.push(name);
  }
  return randomNames;
};

var getRandomWizard = function (property, array) {
  var indexNumber = getRandomNumber(0, array.length - 1);
  property = array[indexNumber];
  return property;
};

var getWizards = function () {
  for (var j = 0; j < WIZARDS_MAX_NUMBER; j++) {
    wizards.push({});
    getWizardName();
    wizards[j].name = getRandomWizard(wizards.name, randomNames);
    wizards[j].coatColor = getRandomWizard(wizards.coatColor, coatColors);
    wizards[j].eyesColor = getRandomWizard(wizards.eyesColor, eyesColors);
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
getWizards();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

setupBlock.querySelector('.setup-similar').classList.remove('hidden');

var openPopup = function () {
  setupBlock.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setupBlock.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var submitForm = function () {
  setupBlockSubmit.setAttribute('type', 'submit');
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var randomColorOfSmth = function (attribute, array, input) {
  var randomColor = getRandomNumber(0, array.length);
  input.setAttribute('value', array[randomColor]);
  return attribute + ': ' + array[randomColor];
};

setupBlockOpen.addEventListener('click', openPopup);

setupBlockOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupBlockClose.addEventListener('click', closePopup);

setupBlockClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupBlockSubmit.addEventListener('click', submitForm);

setupBlockSubmit.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    submitForm();
  }
});

wizardCoat.addEventListener('click', function () {
  wizardCoat.setAttribute('style', randomColorOfSmth('fill', coatColors, wizardCoatInput));
});

wizardEyes.addEventListener('click', function () {
  wizardEyes.setAttribute('style', randomColorOfSmth('fill', eyesColors, wizardEyesInput));
});

fireball.addEventListener('click', function () {
  fireball.setAttribute('style', randomColorOfSmth('background-color', fireballColors, wizardfireballInput));
});
