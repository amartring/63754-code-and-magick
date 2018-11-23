'use strict';

var setupBlock = document.querySelector('.setup');
setupBlock.classList.remove('hidden');

var similarListElement = setupBlock.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var secondNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var wizards = [];
var randomNames = [];

var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

var getWizardName = function () {
  for (var i = 0; i < 4; i++) {
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
  for (var j = 0; j < 4; j++) {
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
