'use strict';

(function () {
  var similarListElement = window.util.setupBlock.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var onGetSuccess = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.util.WIZARDS_MAX_NUMBER; i++) {
      fragment.appendChild(renderWizard(wizards[window.util.getRandomNumber(0, wizards.length)]));
    }
    similarListElement.appendChild(fragment);
    window.util.setupBlock.querySelector('.setup-similar').classList.remove('hidden');
  };

  window.backend.load(onGetSuccess, window.backend.onError);
})();
