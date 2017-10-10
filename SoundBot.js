const config = require('./config/default.json');
const Discord = require("discord.js");
const client = new Discord.Client();
var fs = require('fs');
var version = '1.0';
var defaultVoiceChannel = config.defaultVoiceChannel;
var allowDefaultVoice = true;
var PythonShell = require('python-shell');
var child_process = require('child_process');
var busy = false;
var title = false;
var title2 = false;
var invoice = false;
var allowvapor = false;
var manualoverride = false;
var vidlength = 0;
client.login(config.token);

client.on("message", msg => {
    if (msg.channel.id == 'INPUT CHANNEL ID HERE') { //Discord channel ID goes here, you can get it by putting discord in developer mode and right clicking channel.
        if (msg.content.toLowerCase().startsWith("vaporize ")) {

            var command = msg.content.toLowerCase();
            var command1 = command.replace(/\s/g, '');


            if (busy == false) {
                rmDir('sound', false)
                busy = true;
                if (isURL(command1.substring(8))) {
                    var options = {
                        mode: 'text',
                        args: [msg.content.substring(8)]
                    };
                    command1 = 'vaporizevaporwave';
                } else {
                    var options = {
                        mode: 'text',
                        args: [command1.substring(8)]
                    };
                }
                var pyshell3 = new PythonShell.run('lengthcheck.py', options, function(err) {
                    if (err);

                    if (allowvapor) {
                        var pyshell2 = new PythonShell.run('VaporMain.py', options, function(err) {
                            if (err);
                            title2 = false;
                            if (isURL(command1.substring(8))) {
                                command1 = 'vaporize vaporwave';
                                msg.channel.sendMessage('```Input is a URL```');
                            }
                            if (fs.existsSync('sound/' + command1.substring(8) + 'reverb.wav')) {
                                msg.channel.sendMessage('```Remixing..```');
                                child_process.exec('start /low /min python.exe infinite_jukebox.py ' + 'sound/' + command1.substring(8) + 'reverb.wav ' + '-save sound/' + command1.substring(8) + ' -duration 120', function(err) {
                                    if (err);
									if (!manualoverride){
										playSound(`sound/` + command1.substring(8) + `.wav`, msg);
									}
                                    msg.channel.sendMessage('```Playing and uploading..```');
                                    var options = {
                                        mode: 'text',
                                        args: ['sound/' + command1.substring(8) + '.wav']
                                    };
                                    //fs.unlinkSync(command1.substring(8)+'.wav');
                                    //fs.unlinkSync(command1.substring(8)+'slow.wav');
                                    //fs.unlinkSync(command1.substring(8)+'reverb.wav');
                                    var pyshell = new PythonShell('gdrive_upload.py', options);
                                    pyshell.on('message', function(message) {
                                        // received a message sent from the Python script (a simple "print" statement) 
                                        console.log(message);
                                        msg.channel.sendMessage('```Vaporized version can be downloaded at:```' + message);
                                        if (!invoice) {
                                            busy = false;
                                            title = false;
                                            allowvapor = false;
                                        }
                                        //	fs.unlinkSync('sound/'+command1.substring(8)+'.wav');
                                    });
                                    //busy = false;
                                    //title = false;
                                    //allowvapor = false;

                                });

                            } else {
                                msg.channel.sendMessage('```' + 'sound/' + command1.substring(8) + 'reverb.wav does not exist```');
                                title = false;
                                busy = false;
                            }
                        });
                        pyshell2.on('message', function(message2) {
                            // received a message sent from the Python script (a simple "print" statement) 
                            if (title == false) {
                                console.log(message2);
                                msg.channel.sendMessage('```Downloading and slowing down.. ' + message2 + '```');
                                title = true;
                            }
                        });
                    } else {
                        busy = false;
                        title = false;
                        title2 = false;
                        allowvapor = false;
                    }
                });
                pyshell3.on('message', function(message3) {
                    // received a message sent from the Python script (a simple "print" statement) 
                    if (title2 == false) {
                        title2 = true;
                        console.log(message3);

                        //vid = toSeconds(message3);
                        vidlength = message3.split(':').join("");
                        vidlength2 = parseInt(vidlength)
                        //msg.channel.sendMessage('```video is '+vidlength+'```');
                        if (vidlength < 600) {
						    if (vidlength < 30) {
								busy = false;
								title = false;
								msg.channel.sendMessage('```Why would you even bother me with a video that short? 30 seconds minimum.```');
								return
							} else {
								allowvapor = true;
							}
                        } else {
                            busy = false;
                            title = false;
                            msg.channel.sendMessage('```Video is longer than 5 minutes, therefor fuck you.```');
                            return
                        }
                    }

                });
                //playSound(`sound/` + command.substring(4) + `.mp3`, msg);
            } else {
                msg.channel.sendMessage('```I am busy you fuck, wait for your turn.```');
            }
        }

        else if (msg.content.toLowerCase().startsWith("faster ")) {

            var command = msg.content.toLowerCase();
            var command1 = command.replace(/\s/g, '');
			var words = command.split(' ');
			
			if (!isNaN(words[1])){
			if (parseInt(words[1]) > 0 && parseInt(words[1]) < 10){
            if (busy == false) {
                rmDir('sound', false)
                busy = true;
                if (isURL(command1.substring(7))) {
                    var options = {
                        mode: 'text',
                        args: [msg.content.substring(7)]
                    };
                    var options2 = {
                        mode: 'text',
                        args: [parseFloat('1.'+parseFloat(words[1]).toString()), msg.content.substring(7)]
                    };
                    command1 = 'faster vaporwave';
                } else {
                    var options = {
                        mode: 'text',
                        args: [command1.substring(7)]
                    };
                    var options2 = {
                        mode: 'text',
                        args: [parseFloat('1.'+parseFloat(words[1]).toString()), command1.substring(7)]
                    };
                }
                var pyshell3 = new PythonShell.run('lengthcheck.py', options, function(err) {
                    if (err);

                    if (allowvapor) {
                        var pyshell2 = new PythonShell.run('VaporSpeed.py', options2, function(err) {
                            if (err);
                            title2 = false;
                            if (isURL(command1.substring(7))) {
                                command1 = 'faster vaporwave';
                                msg.channel.sendMessage('```Input is a URL```');
                            }
                            if (fs.existsSync('sound/' + command1.substring(7) + '.wav')) {
                                //msg.channel.sendMessage('```Remixing..```');
								//child_process.exec('start /low /min python.exe infinite_jukebox.py ' + 'sound/' + command1.substring(8) + 'faster.wav ' + '-save sound/' + command1.substring(8) + ' -duration 120', function(err) {
                                   // if (err);
                                    playSound(`sound/` + command1.substring(7) + `.wav`, msg);
                                    msg.channel.sendMessage('```Playing and uploading..```');
                                    var options = {
                                        mode: 'text',
                                        args: ['sound/' + command1.substring(7) + '.wav']
                                    };
                                    //fs.unlinkSync(command1.substring(8)+'.wav');
                                    //fs.unlinkSync(command1.substring(8)+'slow.wav');
                                    //fs.unlinkSync(command1.substring(8)+'reverb.wav');
                                    var pyshell = new PythonShell('gdrive_upload.py', options);
                                    pyshell.on('message', function(message) {
                                        // received a message sent from the Python script (a simple "print" statement) 
                                        console.log(message);
                                        msg.channel.sendMessage('```Sped up version can be downloaded at:```' + message);
                                        if (!invoice) {
                                            busy = false;
                                            title = false;
                                            allowvapor = false;
                                        }
                                        //	fs.unlinkSync('sound/'+command1.substring(8)+'.wav');
                                    });
                                    //busy = false;
                                    //title = false;
                                    //allowvapor = false;

								//});
                            } else {
                                msg.channel.sendMessage('```' + 'sound/' + command1.substring(7) + '.wav does not exist```');
                                title = false;
                                busy = false;
                            }
                        });
                        pyshell2.on('message', function(message2) {
                            // received a message sent from the Python script (a simple "print" statement) 
                            if (title == false) {
                                console.log(message2);
                                msg.channel.sendMessage('```Downloading and speeding up.. ' + message2 + '```');
                                title = true;
                            }
                        });
                    } else {
                        busy = false;
                        title = false;
                        title2 = false;
                        allowvapor = false;
                    }
                });
                pyshell3.on('message', function(message3) {
                    // received a message sent from the Python script (a simple "print" statement) 
                    if (title2 == false) {
                        title2 = true;
                        console.log(message3);

                        //vid = toSeconds(message3);
                        vidlength = message3.split(':').join("");
                        vidlength2 = parseInt(vidlength)
                        //msg.channel.sendMessage('```video is '+vidlength+'```');
                        if (vidlength < 700) {
                            allowvapor = true;
                        } else {
                            busy = false;
                            title = false;
                            msg.channel.sendMessage('```Video is longer than 5 minutes, therefor fuck you.```');
                            return
                        }
                    }

                });
                //playSound(`sound/` + command.substring(4) + `.mp3`, msg);
            } else {
                msg.channel.sendMessage('```I am busy you fuck, wait for your turn.```');
            }
			} else {
				msg.channel.sendMessage('```Input number has to be between 1 and 9, you typed: '+words[2]+'```');
			}
			} else {
				msg.channel.sendMessage('```Correct usage is: "Faster (amount) (Youtube URL or Title)"```');
			}
        }		

        else if (msg.content.toLowerCase().startsWith("reverb ")) {

            var command = msg.content.toLowerCase();
            var command1 = command.replace(/\s/g, '');


            if (busy == false) {
                rmDir('sound', false)
                busy = true;
                if (isURL(command1.substring(6))) {
                    var options = {
                        mode: 'text',
                        args: [msg.content.substring(6)]
                    };
                    command1 = 'reverbvaporwave';
                } else {
                    var options = {
                        mode: 'text',
                        args: [command1.substring(6)]
                    };
                }
                var pyshell3 = new PythonShell.run('lengthcheck.py', options, function(err) {
                    if (err);

                    if (allowvapor) {
                        var pyshell2 = new PythonShell.run('VaporReverb.py', options, function(err) {
                            if (err);
                            title2 = false;
                            if (isURL(command1.substring(6))) {
                                command1 = 'reverb vaporwave';
                                msg.channel.sendMessage('```Input is a URL```');
                            }
                            if (fs.existsSync('sound/' + command1.substring(6) + '.wav')) {
                                //msg.channel.sendMessage('```Remixing..```');
								//child_process.exec('start /low /min python.exe infinite_jukebox.py ' + 'sound/' + command1.substring(8) + 'faster.wav ' + '-save sound/' + command1.substring(8) + ' -duration 120', function(err) {
                                   // if (err);
                                    //playSound(`sound/` + command1.substring(6) + `.wav`, msg);
                                    msg.channel.sendMessage('```Uploading..```');
                                    var options = {
                                        mode: 'text',
                                        args: ['sound/' + command1.substring(6) + '.wav']
                                    };
                                    //fs.unlinkSync(command1.substring(8)+'.wav');
                                    //fs.unlinkSync(command1.substring(8)+'slow.wav');
                                    //fs.unlinkSync(command1.substring(8)+'reverb.wav');
                                    var pyshell = new PythonShell('gdrive_upload.py', options);
                                    pyshell.on('message', function(message) {
                                        // received a message sent from the Python script (a simple "print" statement) 
                                        console.log(message);
                                        msg.channel.sendMessage('```Reverb version can be downloaded at:```' + message);
                                        if (!invoice) {
                                            busy = false;
                                            title = false;
                                            allowvapor = false;
                                        }
                                        //	fs.unlinkSync('sound/'+command1.substring(8)+'.wav');
                                    });
                                    //busy = false;
                                    //title = false;
                                    //allowvapor = false;

								//});
                            } else {
                                msg.channel.sendMessage('```' + 'sound/' + command1.substring(6) + '.wav does not exist```');
                                title = false;
                                busy = false;
                            }
                        });
                        pyshell2.on('message', function(message2) {
                            // received a message sent from the Python script (a simple "print" statement) 
                            if (title == false) {
                                console.log(message2);
                                msg.channel.sendMessage('```Downloading and adding random reverb.. ' + message2 + '```');
                                title = true;
                            }
                        });
                    } else {
                        busy = false;
                        title = false;
                        title2 = false;
                        allowvapor = false;
                    }
                });
                pyshell3.on('message', function(message3) {
                    // received a message sent from the Python script (a simple "print" statement) 
                    if (title2 == false) {
                        title2 = true;
                        console.log(message3);

                        //vid = toSeconds(message3);
                        vidlength = message3.split(':').join("");
                        vidlength2 = parseInt(vidlength)
                        //msg.channel.sendMessage('```video is '+vidlength+'```');
                        if (vidlength < 600) {
                            allowvapor = true;
                        } else {
                            busy = false;
                            title = false;
                            msg.channel.sendMessage('```Video is longer than 5 minutes, therefor fuck you.```');
                            return
                        }
                    }

                });
                //playSound(`sound/` + command.substring(4) + `.mp3`, msg);
            } else {
                msg.channel.sendMessage('```I am busy you fuck, wait for your turn.```');
            }
        }	
		
        else if (msg.content.toLowerCase().startsWith("earrapify ")) {

            var command = msg.content.toLowerCase();
            var command1 = command.replace(/\s/g, '');


            if (busy == false) {
                rmDir('sound', false)
                busy = true;
                if (isURL(command1.substring(9))) {
                    var options = {
                        mode: 'text',
                        args: [msg.content.substring(9)]
                    };
                    command1 = 'earrapify vaporwave';
                } else {
                    var options = {
                        mode: 'text',
                        args: [command1.substring(9)]
                    };
                }
                var pyshell3 = new PythonShell.run('lengthcheck.py', options, function(err) {
                    if (err);

                    if (allowvapor) {
                        var pyshell2 = new PythonShell.run('VaporEarrape.py', options, function(err) {
                            if (err);
                            title2 = false;
                            if (isURL(command1.substring(9))) {
                                command1 = 'earrapify vaporwave';
                                msg.channel.sendMessage('```Input is a URL```');
                            }
                            if (fs.existsSync('sound/' + command1.substring(9) + '.wav')) {
                                //msg.channel.sendMessage('```Remixing..```');
								//child_process.exec('start /low /min python.exe infinite_jukebox.py ' + 'sound/' + command1.substring(8) + 'faster.wav ' + '-save sound/' + command1.substring(8) + ' -duration 120', function(err) {
                                   // if (err);
                                    //playSound(`sound/` + command1.substring(9) + `.wav`, msg);
                                    msg.channel.sendMessage('```Uploading..```');
                                    var options = {
                                        mode: 'text',
                                        args: ['sound/' + command1.substring(9) + '.wav']
                                    };
                                    //fs.unlinkSync(command1.substring(8)+'.wav');
                                    //fs.unlinkSync(command1.substring(8)+'slow.wav');
                                    //fs.unlinkSync(command1.substring(8)+'reverb.wav');
                                    var pyshell = new PythonShell('gdrive_upload.py', options);
                                    pyshell.on('message', function(message) {
                                        // received a message sent from the Python script (a simple "print" statement) 
                                        console.log(message);
                                        msg.channel.sendMessage('```Earrape version can be downloaded at:```' + message);
                                        if (!invoice) {
                                            busy = false;
                                            title = false;
                                            allowvapor = false;
                                        }
                                        //	fs.unlinkSync('sound/'+command1.substring(8)+'.wav');
                                    });
                                    //busy = false;
                                    //title = false;
                                    //allowvapor = false;

								//});
                            } else {
                                msg.channel.sendMessage('```' + 'sound/' + command1.substring(9) + '.wav does not exist```');
                                title = false;
                                busy = false;
                            }
                        });
                        pyshell2.on('message', function(message2) {
                            // received a message sent from the Python script (a simple "print" statement) 
                            if (title == false) {
                                console.log(message2);
                                msg.channel.sendMessage('```Downloading and turning true earrape.. ' + message2 + '```');
                                title = true;
                            }
                        });
                    } else {
                        busy = false;
                        title = false;
                        title2 = false;
                        allowvapor = false;
                    }
                });
                pyshell3.on('message', function(message3) {
                    // received a message sent from the Python script (a simple "print" statement) 
                    if (title2 == false) {
                        title2 = true;
                        console.log(message3);

                        //vid = toSeconds(message3);
                        vidlength = message3.split(':').join("");
                        vidlength2 = parseInt(vidlength)
                        //msg.channel.sendMessage('```video is '+vidlength+'```');
                        if (vidlength < 600) {
                            allowvapor = true;
                        } else {
                            busy = false;
                            title = false;
                            msg.channel.sendMessage('```Video is longer than 5 minutes, therefor fuck you.```');
                            return
                        }
                    }

                });
                //playSound(`sound/` + command.substring(4) + `.mp3`, msg);
            } else {
                msg.channel.sendMessage('```I am busy you fuck, wait for your turn.```');
            }
        }
        //else if (msg.content.startsWith("stop"))
        //{		
        //if (invoice == true){
        //	if(!msg.member.roles.some(r=>["ZULU COMMANDER", "SUPA SOLDIERS", "ZULU PROMOTER", "ZULU COMMANDER"].includes(r.name)) ){
        //		msg.channel.sendMessage("```You don't have permission to do that and you'd have to beg anyway.```");
        //	}
        //	else {
        //	msg.channel.sendMessage('```I want to see you beg.```');
        //	}
        //}
        //else {
        //	msg.channel.sendMessage('```I am not even in a voice channel what do you want?```');
        //}
        //}
        else if (msg.content.toLowerCase() == "stop") {
            if (invoice == true) {
                if (!msg.member.roles.some(r => ["ZULU COMMANDER", "SUPA SOLDIERS", "ZULU PROMOTER", "ZULU GENERAL", "OWNER"].includes(r.name))) { //Change role names here.
                    msg.channel.sendMessage('```Sorry i cannot do that for you. Ask a higher rank member if you are desperate.```');
                } else {
                    msg.channel.sendMessage('```Alright, alright..```');
                    stop(msg);
                }
            } else {
                msg.channel.sendMessage('```I am not even in a voice channel what do you want?```');
            }
        } else if (msg.content.toLowerCase() == "channel") {
            msg.channel.sendMessage('```' + msg.channel.id + '```');
        } 		
        else if (msg.content.toLowerCase() == "toggle voice") {
            if (manualoverride == false) {
                if (!msg.member.roles.some(r => ["ZULU COMMANDER", "ZULU GENERAL", "OWNER"].includes(r.name))) { //Change role names here.
                    msg.channel.sendMessage('```You do not have permission for that.```');
                } else {
                    msg.channel.sendMessage('```Vaporize voice output is disabled```');
                    manualoverride = true;
                }
            } else {
                if (!msg.member.roles.some(r => ["ZULU COMMANDER", "ZULU GENERAL", "OWNER"].includes(r.name))) { //Change role names here.
                    msg.channel.sendMessage('```You do not have permission for that.```');
                } else {
                    msg.channel.sendMessage('```Vaporize voice output is enabled```');
                    manualoverride = false;
                }
            }
        }
        //else if (msg.content.startsWith("help" ))
        //{	
        //	msg.channel.sendMessage('```Maybe if you beg i will help.```');
        //}
        //else if (msg.content.startsWith("help" ))
        //{	
        //	listCommands(msg);
        //}
    }
});




client.on('ready', () => {
    console.log('ZULUBOT v' + version + ' is Running!');
    client.user.setAvatar('zululbotlogo.png')
	client.user.setGame('Type help')
});

rmDir = function(dirPath, removeSelf) {
    if (removeSelf === undefined)
        removeSelf = true;
    try {
        var files = fs.readdirSync(dirPath);
    } catch (e) {
        return;
    }
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile())
                fs.unlinkSync(filePath);
            else
                rmDir(filePath);
        }
    if (removeSelf)
        fs.rmdirSync(dirPath);
};

function isURL(str) {
    var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
    var url = new RegExp(urlRegex, 'i');
    return str.length < 2083 && url.test(str);
}

function playSound(file, msg) {
    var voiceChannel = msg.member.voiceChannel;
    if (voiceChannel == undefined) {
        if (allowDefaultVoice == false) {
            return;
        } else
            voiceChannel = client.channels.get(defaultVoiceChannel)
    }
    if (voiceChannel == undefined) {} else {
        voiceChannel.join().then((connection) => {
            invoice = true;
            const dispatcher = connection.playFile(file);
            dispatcher.on('end', () => {
                invoice = false;
                busy = false;
                title = false;
                allowvapor = false;
                //fs.unlinkSync('sound/'+command1.substring(8)+'.wav');
                connection.disconnect();
            });
        }).catch((error) => {
            console.log('Error occured!');
            console.log(error);
        });
    }
}

function stop(msg) {
    var voiceChannel = msg.member.voiceChannel;
    if (voiceChannel == undefined) {
        voiceChannel = client.channels.get('304178131844202496'); // Default voice channel ID here
    }	
    if (voiceChannel == undefined) {} else {
        voiceChannel.join().then((connection) => {
            connection.disconnect();
            invoice = false;
        }).catch((error) => {
            console.log('Error occured!');
            console.log(error);
        });
    }
}

function listCommands(msg) {
    msg.channel.sendMessage({
        embed: {
            color: 1653585,
            fields: [{
                    name: '🎵 Audio Manipulation',
                    value: 'vaporize'
                }, //value: 'vaporize, plz reverb, plz slower, plz earrape' },
                //{ name: '📷 Image Manipulation', value: 'moreganda' },
                {
                    name: '🔧 Utilities',
                    value: 'stop, help'
                }
            ],
        }
    })
}