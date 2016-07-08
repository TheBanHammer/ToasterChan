var ranks = require('../ranks');

function Example(module, bot) {
	var that = this;
	this.module = module;
	this.bot = bot;
	this.module.SetName('Module Name');
	this.module.RegisterCommand('command', ranks.User, function (data) { 
		// that.bot.sendChat for example. Take a look at plugCubed/PlugAPI for more info
	});
};

module.exports = Example;
