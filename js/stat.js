'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_RADIUS = 20;
var CLOUD_POSITION_X = 100;
var CLOUD_POSITION_Y = 10;
var GAP = 10;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;
var selfBarColor = 'rgba(255, 0, 0, 1)';
var textColor = '#0000ff';
var barTextColor = '#000000';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + CLOUD_RADIUS, y);
  ctx.arc(x, y, CLOUD_RADIUS, 0, 0.5 * Math.PI);
  ctx.lineTo(x, y + CLOUD_HEIGHT - CLOUD_RADIUS);
  ctx.arc(x, y + CLOUD_HEIGHT, CLOUD_RADIUS, 1.5 * Math.PI, 0);
  ctx.lineTo(x + CLOUD_WIDTH - CLOUD_RADIUS, y + CLOUD_HEIGHT);
  ctx.arc(x + CLOUD_WIDTH, y + CLOUD_HEIGHT, CLOUD_RADIUS, Math.PI, 1.5 * Math.PI);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_RADIUS);
  ctx.arc(x + CLOUD_WIDTH, y, CLOUD_RADIUS, 0.5 * Math.PI, Math.PI);
  ctx.lineTo(x + CLOUD_RADIUS, y);
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
  return (playerName === 'Вы') ? selfBarColor : 'rgba(0, 0, ' + randomBlueColor + ', ' + randomOpacity + ')';
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_POSITION_X + GAP, CLOUD_POSITION_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_POSITION_X, CLOUD_POSITION_Y, '#fff');
  ctx.font = 'bold 16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = textColor;
  ctx.fillText('Ура вы победили!', CLOUD_POSITION_X + GAP * 3, CLOUD_POSITION_Y + GAP * 2);
  ctx.fillText('Список результатов:', CLOUD_POSITION_X + GAP * 3, CLOUD_POSITION_Y + GAP * 4);

  var maxTime = getMaxElement(times);
  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = getPlayerColor(names[i]);
    var currentBarHeight = times[i] * BAR_MAX_HEIGHT / maxTime;
    ctx.fillRect(CLOUD_POSITION_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
        CLOUD_POSITION_Y + CLOUD_HEIGHT - GAP * 3 - currentBarHeight, BAR_WIDTH, currentBarHeight);
    ctx.fillStyle = barTextColor;
    ctx.fillText(names[i], CLOUD_POSITION_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_POSITION_Y + CLOUD_HEIGHT - GAP * 2);
    ctx.fillText(Math.round(times[i]), CLOUD_POSITION_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_POSITION_Y + CLOUD_HEIGHT - currentBarHeight - GAP * 5);
  }
};
