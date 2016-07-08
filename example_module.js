var ranks = require('../ranks');

function Example(module, bot) {
	var that = this;
	this.module = module;
	this.bot = bot;
	this.module.SetName('Module Name');
	this.module.RegisterCommand('command', ranks.User, function (data) { 
		// that.bot is the bot commands from plugCubed/PlugAPI.
		/* that.module = {
			ModuleName: '', (string, the name of the module)
			Logger: debug-logger, (debug log of the module)
			Bot: plugapi, (is the same as the reference that is passed in to the module contructor)
			RegisterCommand: function, (register a command, Params: commandName (string), userRank (int), callback (function)),
			SetName: function, (sets the modules name, Params: moduleName (string))
		}*/
	});
};

module.exports = Example;
