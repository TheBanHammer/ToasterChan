/**
 * Made by AnimeDev on 25/10/2016
 * Idea by: Pixie
 * Edits by: TheBanHammer
 * 
 * Extra info:
 * - install lwip and request modules
 * - implement todo's by saying something to the user
 * - point to css code in SetCssImage function
 */

var ranks = require('../ranks');
var lwip = require('lwip');
var request = require('request');
var badges_target_resolution = 30;

function Badges(module, bot) {
    var that = this;
    this.module = module;
    this.bot = bot;
    this.module.SetName('badges');

    function SetCssImage(user, filename, custom) {
        //user is the user object
        //custom == true set the url to the image on this server
        //custom == false delete the custom css entry
		var username = that.bot.connection.escape(user.username);
		if (custom) {
			filename = filename.replace(__dirname, '');
			that.bot.query('INSERT INTO users SET username=' + username + ', time=' + new Date().valueOf() + ', id=' + user.id + ', badgeurl=\'' + filename + '\' ON DUPLICATE KEY UPDATE badgeurl=\'' + filename + '\';');
			that.bot.cache.put('badges', user.id, {
				url: filename,
				extraCss: {}
			});
			
			that.bot.sendChat('[@' + user.username + '] Your badge has been set.');
		}
		else {
			that.bot.query('INSERT INTO users SET username=' + username + ', time=' + new Date().valueOf() + ', id=' + user.id + ' ON DUPLICATE KEY UPDATE badgeurl=\'\';');
			that.bot.cache.delete('badges', user.id);
			
			that.bot.sendChat('[@' + user.username + '] Your badge has been removed.');
		}
    }

    // this.module.RegisterCommand(commandName[string], userRole[int], callback[function], isBeta[bool], supportsDiscord[bool])
    this.module.RegisterCommand('setbadge', ranks.RDJ, function (data) {
        var userid = data.raw.uid;
        var arguments = data.message.substr(9).trim().split(' ');
        var options = {
            url: arguments[0],
            type: "jpg",
            inter: "lanczos",
            mode: "square",
            backcolor: [0, 0, 0, 0]
        }
        if (options.url == 'none' || options.url == 'default' || options.url == 'nothing') {
            SetCssImage(data.from, null, false);
			return;
        }
        for (var i = 1; i < arguments.length; i++) {
            if (arguments[i].indexOf(':') > 0) {
                var sp = arguments[i].split(':');
                options[sp[0]] = sp[1];
            }
            else if (arguments[i] == 'crop' || arguments[i] == 'cover' || arguments[i] == 'contain') {
                options.mode = arguments[i];
            }
        }
        if (options.url.endsWith(".jpg") || options.url.endsWith(".png")) {
            request({ url: options.url, encoding: null }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    lwip.open(body, options.url.substr(-3), function (err, image) {
                        var width = image.width();
                        var height = image.height();
                        if (options.mode == "square" && width != height) {
                            that.bot.sendChat(data.issuer + 'Can\'t set badge. Both the height and width must be the same!');
                            return;
                        }
                        var targetfilename = __dirname + "/badges/" + userid + '.' + options.type;
                        if (width > badges_target_resolution || height > badges_target_resolution) {
                            var callback = function (err, image) {
                                if (err !== undefined && err != null) {
                                    that.bot.sendChat(data.issuer + 'I\'ve failed to download your badge.');
                                    return;
                                }
                                image.writeFile(targetfilename, function (err) {
                                    if (err !== undefined && err != null) {
                                        that.bot.sendChat(data.issuer + 'I\'ve failed to download and update your badge.');
										console.log(err);
										console.log(targetfilename);
                                        return;
                                    }
                                    SetCssImage(data.from, targetfilename, true);
                                });
                            };
                            if (options.mode == "square" || options.mode == "crop" || options.mode == "cover") {
                                image.cover(badges_target_resolution, badges_target_resolution, options.inter, callback);
                            }
                            else if (options.mode == "contain") {
                                image.contain(badges_target_resolution, badges_target_resolution, options.backcolor, options.inter, callback);
                            }
                            else {
                                that.bot.sendChat(data.issuer + 'The mode you are trying to use does not exist. If you don\'t know what this does please do not mess with it.');
                            }
                        }
                        else {
                            image.writeFile(targetfilename, function (err) {
                                if (err !== undefined && err != null) {
                                    that.bot.sendChat(data.issuer + 'I\'ve failed to download and update your badge.');
									console.log(err);
									console.log(targetfilename);
                                    return;
                                }
                                SetCssImage(data.from, targetfilename, true);
                            });
                        }
                    });
                }
                else {
                    that.bot.sendChat(data.issuer + 'I\'ve failed to download your badge.');
                }
            });
        }
        else {
            that.bot.sendChat(data.issuer + 'Bad link detected.');
        }
    });
};

module.exports = Badges;
