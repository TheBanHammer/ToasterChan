var ranks = require('../ranks');

function BlazeItResponse(module, bot) {
	var that = this;
	this.module = module;
	this.bot = bot;
	this.module.SetName('420 Blaze It');
	this.module.RegisterCommand('4:20', ranks.User, function (data) { 
		// that.bot is the bot commands from plugCubed/PlugAPI.
		/* that.module = {
			ModuleName: '', (string, the name of the module)
			Logger: debug-logger, (debug log of the module)
			Bot: plugapi, (is the same as the reference that is passed in to the module contructor)
			RegisterCommand: function, (register a command, Params: commandName (string), userRank (int), callback (function)),
			SetName: function, (sets the modules name, Params: moduleName (string))
		}*/
		var currentBotDate = new Date();
		var Minutes1 = currentBotDate.getMinutes();
		if (Minutes1 === 20) {
			that.bot.sendChat('Blaze It! :fire:');
		}
	});
};

module.exports = BlazeItResponse;
