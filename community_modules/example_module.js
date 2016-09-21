var ranks = require('../ranks');

function Example(module, bot) {
	var that = this;
	this.module = module;
	this.bot = bot;
	this.module.SetName('Module Name');
	// that.bot is the bot commands from plugCubed/PlugAPI.
	/* that.module = {
		ModuleName: '', (string, the name of the module)
		Logger: debug-logger, (debug log of the module)
		Bot: plugapi, (is the same as the reference that is passed in to the module contructor)
		RegisterCommand: function, (register a command, Params: commandName (string), userRank (int), callback (function)),
		SetName: function, (sets the modules name, Params: moduleName (string))
	}*/
	
	// this.bot.sendChat has been overridden to provide extra functionality.
	/* this.bot.sendChat now has the following params:
		- message
		- timeout
		- discordData
	   if you have marked the command as having discord support when you use 'RegisterCommand' you will need to pass the data variable to this part.
	   I.e. that.bot.sendChat('test', null, data);
	*/
	
	// this.module.RegisterCommand(commandName[string], userRole[int], callback[function], isBeta[bool], supportsDiscord[bool])
	this.module.RegisterCommand('command', ranks.User, function (data) { 
		
	});
	// this.module.RegisterEvent(eventName[string], callback[function])
	this.module.RegisterEvent('event', function (data) { 
		
	});
};

module.exports = Example;
