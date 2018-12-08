'use strict';

(function () {
  var WIZARDS_MAX_NUMBER = 4;
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
  var wizards = [];
  var randomNames = [];

  var similarListElement = window.util.setupBlock.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');


  var getWizardName = function () {
    for (var i = 0; i < WIZARDS_MAX_NUMBER; i++) {
      var randomFirstName = window.util.getRandomNumber(0, firstNames.length - 1);
      var randomSecondName = window.util.getRandomNumber(0, secondNames.length - 1);
      var name = firstNames[randomFirstName] + ' ' + secondNames[randomSecondName];
      randomNames.push(name);
    }
    return randomNames;
  };

  var getRandomWizard = function (property, array) {
    var indexNumber = window.util.getRandomNumber(0, array.length - 1);
    property = array[indexNumber];
    return property;
  };

  var getWizards = function () {
    for (var j = 0; j < WIZARDS_MAX_NUMBER; j++) {
      wizards.push({});
      getWizardName();
      wizards[j].name = getRandomWizard(wizards.name, randomNames);
      wizards[j].coatColor = getRandomWizard(wizards.coatColor, window.util.coatColors);
      wizards[j].eyesColor = getRandomWizard(wizards.eyesColor, window.util.eyesColors);
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
})();
