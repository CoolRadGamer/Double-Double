function onLoad() {
	player = {};
	let d = localStorage.getItem('incremental-creationsDouble-Double');
	let saveData = d?JSON.parse(atob(d)):{}
	if (Object.keys(saveData).includes('number')) player['number'] = new OmegaNum(saveData['number']);
	else player['number'] = new OmegaNum(1);
	if (Object.keys(saveData).includes('multiplier')) player['multiplier'] = new OmegaNum(saveData['multiplier']);
	else player['multiplier'] = new OmegaNum(2);
	if (Object.keys(saveData).includes('MP')) player['MP'] = new OmegaNum(saveData['MP']);
	else player['MP'] = new OmegaNum(0);
	if (Object.keys(saveData).includes('up1cost')) player['up1cost'] = new OmegaNum(saveData['up1cost']);
	else player['up1cost'] = new OmegaNum(10);
};
OmegaNum.prototype.toSWDP = function(digits) {
	return new OmegaNum(this).times(OmegaNum.pow(10, digits)).round().div(OmegaNum.pow(10, digits));
}
function multiply() {
	player['number'] = player['number'].times(player['multiplier']);
}
function prestige() {
	player['MP'] = player['MP'].plus(MPgain());
	player['number'] = player['number'].div(player['number']);
}
function up1buy() {
	if (!player['MP'].gte(player['up1cost'])) return;
	player['multiplier'] = player['multiplier'].plus('1');
	player['MP'] = player['MP'].minus(player['up1cost']).max(0);
	player['up1cost'] = player['up1cost'].times('3');
}
function spicy() {
	if (!player['MP'].gte('1e10')) return;
	player['MP'] = player['MP'].times('2');
}
function MPgain() {
	let x = new OmegaNum('0');
	if (!player['number'].gte('1.79e308')) return x;
	x = x.plus('1');
	x = x.times(player['number']);
	x = x.div('1.79e308');
	x = x.pow('0.005');
	x = x.toSWDP('0');
	return x;
}
var updater_starts = {};
updater_starts['textnumber'] = 'the number is {{number}}';
updater_starts['buttonsmult'] = 'Multiply the number by {{multiplier}}';
updater_starts['buttonspres'] = 'prestige for Current Amount:{{MPgain}} multiplier points';
updater_starts['buttonsup1'] = 'Increase the multiplier by 1, costs {{up1cost}}MP';
updater_starts['textmpcount'] = 'you have {{MP}} MP';
function parseForUpdates(id) {
	let txt = updater_starts[id];
	if (txt.includes('{{') && txt.includes('}}')) {
		let content = txt.slice(txt.indexOf('{{')+2, txt.indexOf('}}')).split(' ').join('');
		let act;
		if (player[content]===undefined) act = window[content]();
		else act = player[content];
		document.getElementById(id).textContent = txt.slice(0, txt.indexOf('{{'))+act+txt.slice(txt.indexOf('}}')+2, txt.length);
	}
}
function save() {
	localStorage.setItem('incremental-creationsDouble-Double', btoa(JSON.stringify(player)))}
function hardReset(force=false) {
	if (!force) if (!confirm('Are you sure you want to reset everything?')) return;
	localStorage.removeItem('incremental-creationsDouble-Double');
	onLoad();
}
function gameLoop(diff) {
	parseForUpdates('textnumber');
	parseForUpdates('buttonsmult');
	parseForUpdates('buttonspres');
	parseForUpdates('buttonsup1');
	parseForUpdates('textmpcount');
}
var lastTime = new Date().getTime();
let interval = setInterval(function() {
	gameLoop(new Date().getTime()-lastTime);
	lastTime = new Date().getTime();
}, 50)
let saveInterval = setInterval(function() {
	save();
}, 4000)
