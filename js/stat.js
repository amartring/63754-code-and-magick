'use strict';

(function () {
  var GAP = 10;
  var CURRENT_PLAYER = 'Вы';
  var cloud = {
    WIDTH: 420,
    HEIGHT: 270,
    RADIUS: 20,
    POSITION_X: 100,
    POSITION_Y: 10,
    COLOR: '#ffffff',
    SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)'
  };
  var bar = {
    GAP: 50,
    WIDTH: 40,
    MAX_HEIGHT: 150,
    CURRENT_COLOR: 'rgba(255, 0, 0, 1)',
    TEXT_COLOR: '#000000'
  };
  var font = {
    STYLE: 'bold 16px PT Mono',
    COLOR: '#0000ff'
  };

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x + cloud.WIDTH, y);
    ctx.arc(x, y, cloud.RADIUS, 0, 0.5 * Math.PI);
    ctx.lineTo(x, y + cloud.HEIGHT - cloud.RADIUS);
    ctx.arc(x, y + cloud.HEIGHT, cloud.RADIUS, 1.5 * Math.PI, 0);
    ctx.lineTo(x + cloud.WIDTH - cloud.RADIUS, y + cloud.HEIGHT);
    ctx.arc(x + cloud.WIDTH, y + cloud.HEIGHT, cloud.RADIUS, Math.PI, 1.5 * Math.PI);
    ctx.lineTo(x + cloud.WIDTH, y + cloud.RADIUS);
    ctx.arc(x + cloud.WIDTH, y, cloud.RADIUS, 0.5 * Math.PI, Math.PI);
    ctx.lineTo(x + cloud.RADIUS, y);
    ctx.fill();
    ctx.closePath();
  };

  var getMaxElement = function (array) {
    var maxElement = array[0];
    for (var i = 0; i < array.length; i++) {
      if (array[i] > maxElement) {
        maxElement = array[i];
      }
    }
    return maxElement;
  };

  var getPlayerColor = function (playerName) {
    var randomBlueColor = (Math.random() * 255).toFixed(0);
    var randomOpacity = (Math.random() + 0.1).toFixed(1);
    return (playerName === CURRENT_PLAYER) ? bar.CURRENT_COLOR : 'rgba(0, 0, ' + randomBlueColor + ', ' + randomOpacity + ')';
  };

  var getCurrentBar = function (ctx, playersArray, timesArray) {
    var maxTime = getMaxElement(timesArray);
    for (var i = 0; i < playersArray.length; i++) {
      ctx.fillStyle = getPlayerColor(playersArray[i]);
      var currentBarHeight = timesArray[i] * bar.MAX_HEIGHT / maxTime;
      ctx.fillRect(cloud.POSITION_X + bar.GAP + (bar.GAP + bar.WIDTH) * i,
          cloud.POSITION_Y + cloud.HEIGHT - GAP * 3 - currentBarHeight, bar.WIDTH, currentBarHeight);
      ctx.fillStyle = bar.TEXT_COLOR;
      ctx.fillText(playersArray[i], cloud.POSITION_X + bar.GAP + (bar.GAP + bar.WIDTH) * i, cloud.POSITION_Y + cloud.HEIGHT - GAP * 2);
      ctx.fillText(Math.round(timesArray[i]), cloud.POSITION_X + bar.GAP + (bar.GAP + bar.WIDTH) * i, cloud.POSITION_Y + cloud.HEIGHT - currentBarHeight - GAP * 5);
    }
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, cloud.POSITION_X + GAP, cloud.POSITION_Y + GAP, cloud.SHADOW_COLOR);
    renderCloud(ctx, cloud.POSITION_X, cloud.POSITION_Y, cloud.COLOR);
    ctx.font = font.STYLE;
    ctx.textBaseline = 'hanging';
    ctx.fillStyle = font.COLOR;
    ctx.fillText('Ура вы победили!', cloud.POSITION_X + GAP * 3, cloud.POSITION_Y + GAP * 2);
    ctx.fillText('Список результатов:', cloud.POSITION_X + GAP * 3, cloud.POSITION_Y + GAP * 4);
    getCurrentBar(ctx, names, times);
  };
})();
