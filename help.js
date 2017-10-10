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
var vidlength = 0;
client.login(config.token); 

client.on("message", msg => 
{
  
	if (msg.channel.id == '366261102574698497' || msg.channel.id == '366631232622297099' || msg.channel.id == '366637602599731210' || msg.channel.id == '298778292335411200' ) {
	if (msg.content.toLowerCase().startsWith("vaporize ")) {
	 
	}	
	else if (msg.content.toLowerCase().startsWith("stop")) {
	
	}	
	else if (msg.content.toLowerCase().startsWith("help")) {

	}	
	else if (msg.content.toLowerCase() == "channel") {
		
	}	
	else if (msg.content.toLowerCase() == "stop") {
	
	}	
	else if (msg.content.toLowerCase() == "help") {

	}	
	else if (msg.content.toLowerCase().startsWith("earrapify ")) {
		
	}	
	else if (msg.content.toLowerCase().startsWith("reverb ")) {
		
	}	
	else if (msg.content.toLowerCase().startsWith("faster ")) {
		
	}	
	else if (msg.content.toLowerCase().startsWith("toggle voice")) {
		
	}	
	else if (msg.author.bot) {
		
	}
	else {
		msg.delete(1000); 
	}
	
	if (msg.content.toLowerCase() == "channel" )
	{	
		msg.channel.sendMessage('```'+msg.channel.id+'```');
	}
	//else if (msg.content.startsWith("help" ))
	//{	
	//	msg.channel.sendMessage('```Maybe if you beg i will help.```');
	//}
	else if (msg.content.toLowerCase() == "help" )
	{	
		listCommands(msg);
	}
	}
});

client.on('ready', () => 
{
	console.log('ZULUBOT v' + version + ' is Running!');
	client.user.setAvatar('zululbotlogo.png')
});

rmDir = function(dirPath, removeSelf) {
if (removeSelf === undefined)
    removeSelf = true;
    try { var files = fs.readdirSync(dirPath); }
    catch(e) { return; }
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

function playSound(file, msg) 
{
	var voiceChannel = msg.member.voiceChannel;
	if (voiceChannel == undefined)
	{
		if (allowDefaultVoice == false)
		{
			return;
		}
		else
			voiceChannel = client.channels.get(defaultVoiceChannel)		
	}
	if (voiceChannel == undefined)
	{
	}
	else{
	voiceChannel.join().then((connection) => 
	{
		invoice = true;
		const dispatcher = connection.playFile(file);
		dispatcher.on('end', () => 
		{
			invoice = false;
			busy = false;
			title = false;
			allowvapor = false;
			//fs.unlinkSync('sound/'+command1.substring(8)+'.wav');
			connection.disconnect();
		});
	}).catch((error) => 
	{
		console.log('Error occured!');
		console.log(error);
	});
	}
}

function stop(msg) 
{
    var voiceChannel = msg.member.voiceChannel;
    if (voiceChannel == undefined)
    {
        voiceChannel = client.channels.get(defaultVoiceChannel)        
    }
	if (voiceChannel == undefined)
	{
	}
	else{    
    voiceChannel.join().then((connection) => 
    {
        connection.disconnect();
		invoice = false;
    }).catch((error) => 
    {
        console.log('Error occured!');
        console.log(error);
    });
	}
}

function toSeconds(str) {
    var pieces = str.split(":");
    var result = Number(pieces[0]) * 60 + Number(pieces[1]);
    return(result.toFixed(3));
}

function listCommands(msg) {
    msg.channel.sendMessage({
      embed: {
        color: 1653585,
        fields: [
          { name: ':musical_note:  Audio Manipulation', value: 'vaporize, reverb, faster, earrapify' }, //value: 'vaporize, plz reverb, plz slower, plz earrape' },
          //{ name: 'ðŸ“· Image Manipulation', value: 'moreganda' },
          { name: ':gear:  Utilities', value: 'stop, help, toggle voice' }
        ],
      }
    })
}
