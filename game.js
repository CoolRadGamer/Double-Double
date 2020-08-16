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
	if (Object.keys(saveData).includes('EP')) player['EP'] = new OmegaNum(saveData['EP']);
	else player['EP'] = new OmegaNum(1);
	if (Object.keys(saveData).includes('OP')) player['OP'] = new OmegaNum(saveData['OP']);
	else player['OP'] = new OmegaNum(1);
	if (Object.keys(saveData).includes('auto1toggle')) player['auto1toggle'] = new OmegaNum(saveData['auto1toggle']);
	else player['auto1toggle'] = new OmegaNum(0);
	if (Object.keys(saveData).includes('auto2toggle')) player['auto2toggle'] = new OmegaNum(saveData['auto2toggle']);
	else player['auto2toggle'] = new OmegaNum(0);
	if (Object.keys(saveData).includes('auto3toggle')) player['auto3toggle'] = new OmegaNum(saveData['auto3toggle']);
	else player['auto3toggle'] = new OmegaNum(0);
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
	player['multiplier'] = player['multiplier']'1.5');
	player['MP'] = player['MP'].minus(player['up1cost']).max(0);
	player['up1cost'] = player['up1cost'].times('3');
}
function spicy() {
	if (!player['MP'].gte('1e10')) return;
	player['auto1toggle'] = player['auto1toggle'].plus('1');
}
function exponentiate() {
	if (!player['MP'].gte('1.8e308')) return;
	if (!player['number'].gte('1e10000')) return;
	player['EP'] = player['EP'].plus(EPgain());
	player['number'] = player['number'].div(player['number']);
	player['multiplier'] = player['multiplier'].times('0');
	player['multiplier'] = player['multiplier'].plus('2');
	player['up1cost'] = player['up1cost'].times('0');
	player['up1cost'] = player['up1cost'].plus('10');
	player['MP'] = player['MP'].times('0');
}
function power() {
	player['number'] = player['number'].pow(player['EP']);
}
function timeskip() {
	player['MP'] = player['MP'].plus('1.8e308');
	player['number'] = player['number'].plus('1e10000');
}
function omega() {
	if (!player['number'].gte('eeeee5e308')) return;
	player['OP'] = player['OP'].plus(OPgain());
	player['number'] = player['number'].div(player['number']);
	player['multiplier'] = player['multiplier'].times('0');
	player['multiplier'] = player['multiplier'].plus('2');
	player['MP'] = player['MP'].times('0');
	player['EP'] = player['EP'].div(player['EP']);
	player['up1cost'] = player['up1cost'].times('0');
	player['up1cost'] = player['up1cost'].plus('10');
}
function final() {
	if (!player['OP'].gte('eeeeeee1e308')) return;
	player['EP'] = player['EP'].pow(player['EP']);
	player['EP'] = player['EP'].pow(player['EP']);
	player['EP'] = player['EP'].pow(player['EP']);
	player['number'] = player['number'].pow(player['EP']);
	player['number'] = player['number'].pow(player['EP']);
	player['MP'] = player['MP'].pow(player['EP']);
	player['EP'] = player['EP'].pow(player['EP']);
	player['EP'] = player['EP'].pow(player['EP']);
	player['EP'] = player['EP'].pow(player['EP']);
}
function auto2up() {
	if (!player['EP'].gte('eeeee1e10')) return;
	player['auto2toggle'] = player['auto2toggle'].plus('1');
}
function auto3up() {
	if (!player['OP'].gte('(10^)^1000 10')) return;
	player['auto3toggle'] = player['auto3toggle'].plus('1');
}
function MPgain() {
	let x = new OmegaNum('0');
	if (!player['number'].gte('1e150')) return x;
	x = x.plus('1');
	x = x.times(player['number']);
	x = x.div('1e150');
	x = x.pow('0.005');
	x = x.toSWDP('0');
	return x;
}
function EPgain() {
	let x = new OmegaNum('0');
	if (!player['number'].gte('1e10000')) return x;
	if (!player['MP'].gte('1.8e308')) return x;
	x = x.plus('1');
	x = x.times(player['number']);
	x = x.times(player['MP']);
	x = x.div('1e10308');
	x = x.pow('0.0000005');
	x = x.toSWDP('0');
	return x;
}
function OPgain() {
	let x = new OmegaNum('0');
	if (!player['number'].gte('eeeee5e308')) return x;
	x = x.plus('1');
	x = x.times(player['number']);
	x = x.div('eeeee5e308');
	x = x.pow('1.79e-308');
	x = x.pow('1.79e-308');
	x = x.pow('1.79e-308');
	x = x.toSWDP('0');
	return x;
}
var updater_starts = {};
updater_starts['buttonsmult'] = 'Multiply the number by {{multiplier}}';
updater_starts['buttonspres'] = 'prestige for Current Amount:{{MPgain}} multiplier points';
updater_starts['textmpcount'] = 'you have {{MP}} MP';
updater_starts['buttonsraise'] = 'Raise the number to the power of {{EP}}';
updater_starts['textepcount'] = 'you have {{EP}}EP';
updater_starts['buttonsexpo'] = 'Exponentiate for Current Amount:{{EPgain}}EP';
updater_starts['textnumber'] = 'the number is {{number}}';
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
	parseForUpdates('buttonsmult');
	parseForUpdates('buttonspres');
	parseForUpdates('textmpcount');
	parseForUpdates('buttonsraise');
	parseForUpdates('textepcount');
	parseForUpdates('buttonsexpo');
	parseForUpdates('textnumber');
	if (player['auto1toggle'].gte('1')) multiply()
	if (player['auto2toggle'].gte('1')) exponentiate()
	if (player['auto3toggle'].gte('1')) final()
}
var lastTime = new Date().getTime();
let interval = setInterval(function() {
	gameLoop(new Date().getTime()-lastTime);
	lastTime = new Date().getTime();
}, 50)
let saveInterval = setInterval(function() {
	save();
}, 4000)
