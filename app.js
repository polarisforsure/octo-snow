// Load up the discord.js library
const Discord = require("discord.js");
// Load the requests library
const Request = require("request");

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values.
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.


client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

//WELCOMER SECTION
client.on("guildMemberAdd", (member) => { // Check out previous chapter for information about this event
let guild = member.guild; 
let memberTag = member.user.tag; 
if(guild.systemChannel){
	guild.systemChannel.send(new Discord.RichEmbed() // Creating instance of Discord.RichEmbed
	.setTitle("A new user joined") // Calling method setTitle on constructor. 
	.setDescription(memberTag + " has joined the server! Give them a nice warm welcome!") // Setting embed description
	.setThumbnail(member.user.displayAvatarURL) // The image on the top right; method requires an url, not a path to file!
	.addField("Members now", member.guild.memberCount) // Adds a field; First parameter is the title and the second is the value.
	.setTimestamp() // Sets a timestamp at the end of the embed
	);
}
});

client.on("guildMemberRemove", (member) => { // Check out previous chapter for information about this event
let guild = member.guild; 
let memberTag = member.user.tag; 
if(guild.systemChannel){
	guild.systemChannel.send(new Discord.RichEmbed() // Creating instance of Discord.RichEmbed
	.setTitle("A member has left!") // Calling method setTitle on constructor. 
	.setDescription(memberTag + " has left the server :c") // Setting embed description
	.setThumbnail(member.user.displayAvatarURL) // The image on the top right; method requires an url, not a path to file!
	.addField("Members now", member.guild.memberCount) // Adds a field; First parameter is the title and the second is the value.
	.setTimestamp() // Sets a timestamp at the end of the embed
	);
}
});
//END WELCOMER SECTION
 
function randomval(Min, Max){
  return Math.floor( Math.random() * ( 1 + Max - Min ) ) + Min;
}

async function EmbedSend(Str,Url,Mess){
  await Mess.channel.send({embed:{
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: Str,
    url: Url,
    image:{url: Url}
  }});
}

//Lewd Function
async function Lewd(Type,Mess){
  var BaseTextUrl = "";
  switch(Type){
    case 0:BaseTextUrl = config.Lewds.Gay + "gaylist.txt"; break;
    case 1:BaseTextUrl = config.Lewds.Lesbian + "lesbianlist.txt"; break;
    case 2:BaseTextUrl = config.Lewds.Straight + "straightlist.txt"; break;
  }


  var Header = {                                                   
    url : BaseTextUrl
  }

  Request(Header,                               //Request Returns a JSON file
    async function(error,response,body){
        if (!error && response.statusCode == 200){
          var Parsed = body.split("\n");
          var randomAdded = Parsed[randomval(0,Parsed.length-1)];
          var FinalUrl = "";
          switch(Type){
            case 0:FinalUrl  = config.Lewds.Gay + randomAdded; break;
            case 1:FinalUrl  = config.Lewds.Lesbian + randomAdded; break;
            case 2:FinalUrl  = config.Lewds.Straight + randomAdded; break;
          }
          await EmbedSend("Yiff Yiff",FinalUrl ,Mess);
          
        }
      }
    )
  }
 
client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

	//DM the user a list of commands.
if(command === "help"){
	message.author.send("\n -----------------------------------------------------\n\n***Important commands*** :\n `+invite` - A link so you can invite me to other servers!\n `+donate` - Get donate links!\n `+credits` - Find out who made me!\n\n***My fun commands are as follows :D*** :\n `+ping` - Find out my response time!\n `+kiss` - Kiss a member!\n `+pat` - Give someone some pats!\n `+spank` - Spank some naughty members bottom!\n `+lick` - give someone a nice slobbery lick!\n `+shoot` - Shoot someone!\n `+hug` - Give someone a nice big hug!\n `+slap` - That should wake them up!\n `+cuddle` - Cuddle someone!\n `+shrug` - Fairly obvious ;P\n `+snuggle` - The more intimate cuddle ;)\n `+bite` - Bit someones face!\n `+hide` - Hide from someone\n `+dance` - Breakdance or dance with someone!\n `+run` - Run from someone\n `+stroll` - Take a nice stroll!\n `+smile` - give everyone a nice smile!\n `+fight` - fight with someone!\n `+heart`- Give everyone a nice big heart!\n `+scratch` - 'Tis but a scratch!\n `+whopingedme` - Who pinged me?! >:c\n `scratch` - 'Tis but a scratch!\n `+fart` - I fart in your general direction!\n `+nou` - No U!\n `+peck` - Give somebody a nice peck on the cheek!\n `+brows` - Give someone the funky eyebrows!\n `+whee` - Whee!\n `+wag` - Wag that tail!\n `+pillowfight` - Have a pillow fight with someone!\n `+woohoo` WOOHOO!!\n `+insane` - Go insane!\n `+cry` - Cry :'c\n `+roll` - DO A BARREL ROLL!\n `+uwotm8` - u wot m8?\n `+ew` - Ew! Ew! Ew! Get it off!\n `+owo` - OwO What's this?\n `+told` - You just got TOLD!\n `+faint` - Faint!\n `+headshake` - Shake that head!\n `+nuzzle` - Give someone a nice nuzzle\n `+grabby` - Make grabby paws!\n `+flip` - Flip those tables!\n\n====NSFW Commands====\n\n`+spank` - Spank that booty!\n`+whip` - Whip that booty!\n`+e621` - By itself, I will send you a random image! (Experimental) \n`+e621 <tag>` - I will send you an image with that tag! (Experimental) \n`+ygif <tag>` - I will send you an gifs with that tag! (Coming Soon)") //DM user help commands.
    message.react("👍")
}



//BASIC ACTIONS
function isSelfTest () {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(member.user === message.author )  return true;
    return false;
  };
//function isNSFW () {
	//if (message.channel.nsfw === false) {
    //return message.reply(":warning: This channel isn't marked as NSFW.");
//	
//  }
//};
//dont use me yet
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`My latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  //if(command === "say") 
    // makes the bot say something and delete the message. As an example, it's open to anyone to use.
    // To get the "message" itself we join the `args` back into a string with spaces:
    //const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    //message.delete().catch(O_o=>{});
    // And we get the bot to say the thing:
   // message.channel.send(sayMessage);
  

  
if(command === "announce") {
    var FoundAdmin = false;
    for(var i=0; i < config.Admins.length; i++){
      if(message.author.id == config.Admins[i]) {
        FoundAdmin = true;
        break;
      }
    }

    if(FoundAdmin === true){
      var MessageRet = args.join(" ");
      var Guilds = client.guilds.array();
	  console.log(Guilds.length);
      for(var i=0; i < Guilds.length; i++){
		console.log("========Trying:"+i+"========");
        var GuildChannels = Guilds[i].channels.array();
        var AnounceChannel = undefined;
        var generalChannel = undefined;
        for(var j=0; j < GuildChannels.length; j++){
          if (!(GuildChannels[j] === undefined)){
			  var GuildName = GuildChannels[j].name;
			  
			  if(GuildName === "announcements") {
				AnounceChannel = GuildChannels[j];
			  }
			  if(GuildName === "general") {
				generalChannel = GuildChannels[j];
			  }
		  }
        }

        if (!(AnounceChannel === undefined)){
          AnounceChannel.send(MessageRet).catch(error => console.log("Guild:"+Guilds[i].name+" Could Not be Announced Reason:"+error));
          console.log("Guild:"+Guilds[i].name+" Announced");
        } else if(!(generalChannel === undefined)){
          generalChannel.send(MessageRet).catch(error => console.log("Guild:"+Guilds[i].name+" Could Not be Announced Reason:"+error));
          console.log("Guild:"+Guilds[i].name+" Announced");
        } else {
          console.log("Guild:"+Guilds[i].name+" Could Not be Announced")
        }

	  console.log("========================");
      }
    } else {
      message.author.send("Only Administrators of the Octave Bot have Access to that command")
    }

  }

 
  //FUN Commands
  
  //Kiss
  if(command === "kiss" || command === "kissed" || command === "kisses") {
	  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
		return message.reply("You make a kissy face at the people in the server! ");
    if(isSelfTest()) return message.channel.send(`${message.author} tried to **kiss** themselves, how narcissistic!`);

	return message.channel.send(`Smoochy Smoochy ${message.author} just **kissed** ${member.user}! https://thumbs.gfycat.com/SilverSickBillygoat-max-1mb.gif`);
  }
  
  //Nuzzle
  if(command === "nuzzle" || command === "nuzzles") {
	  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
		return message.reply("You nuzzle the air looking strange doing so.");
    if(isSelfTest()) return message.channel.send(`${message.author} tried to nuzzle themselves. Someone give them a nuzzle partner!`);

	return message.channel.send(`Smoochy Smoochy ${message.author} just nuzzled ${member.user}! How cute :3 https://i.gifer.com/3NnUh.gif`);
  }
  

  //Boop
  if(command === "boop" || command === "boops") {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("You boop the air!");
      if(isSelfTest()) return message.channel.send(`${message.author} just **booped** themselves, how odd O_o`);

  return message.channel.send(`${member.user} just got **booped** by ${message.author}! http://boop.social/wp-content/uploads/2016/05/harleyboop.gif`);
  }
  
  //Pat
  if(command === "pat" || command === "pats") {
   let member = message.mentions.members.first() || message.guild.members.get(args[0]);
   if(!member)
   return message.reply("You can't pat nothing!");
   if(isSelfTest()) return message.channel.send(`${message.author} just pat themselves on the back!`);

  return message.channel.send(`${member.user} just got some soft and gentle **pats** from ${message.author}! https://i.gifer.com/3NnUe.gif`);
  }
  
  //Lick
  if(command === "lick" || command === "licks") {
   let member = message.mentions.members.first() || message.guild.members.get(args[0]);
   if(!member)
   return message.reply("You lick your lips!");
   if(isSelfTest()) return message.channel.send(`${message.author} **licked** themselves! `);

  return message.channel.send(`${message.author} just gave ${member.user} a nice slobbery **lick**! http://i.giphy.com/3qLCzcdRA8yOhggw6I.gif`);
  }

  //Shoot
  if(command === "shoot" || command === "shoots") {
   let member = message.mentions.members.first() || message.guild.members.get(args[0]);
   if(!member)
   return message.reply("You gotta shoot at someone! Or yourself...");
   if(isSelfTest()) return message.channel.send(`${message.author} just shot themselves!`);

  return message.channel.send(`${message.author} **shot** ${member.user}, +100! https://johnjohns1.fjcdn.com/gifs/Ipoke_12d6cb_3056699.gif`);
  }
  
  //Hug
  if(command === "hug" || command === "hugs") {
   let member = message.mentions.members.first() || message.guild.members.get(args[0]);
   if(!member)
   return message.reply("You can't hug nothing!");
   if(isSelfTest()) return message.channel.send(`${message.author} gave themselves a nice warm embrace ^w^`);

  return message.channel.send(`D'aww, ${message.author} just gave ${member.user} a nice warm hug! https://i.pinimg.com/originals/1c/3c/67/1c3c67770571a8c3d24d40b4b59bef3a.gif`);
  }
  
  //Slap
  if(command === "slap" || command === "slaps") {
   let member = message.mentions.members.first() || message.guild.members.get(args[0]);
   if(!member)
   return message.reply("Gotta pick someone from the server!");
   if(isSelfTest()) return message.channel.send(`${message.author} **slaps** themselves! They feel more awake now!`);

  return message.channel.send(`Oooh that's gotta hurt! ${member.user} got smacked by ${message.author}! https://i.makeagif.com/media/6-24-2015/harEhw.gif`);
  }
  
  //Cuddle
  if(command === "cuddle" || command === "cuddles") {
   let member = message.mentions.members.first() || message.guild.members.get(args[0]);
   if(!member)
   return message.reply("You create an imaginary friend to cuddle! It didn't go very well...");
   if(isSelfTest())
    return message.channel.send(`${message.author} just cuddled with themselves! How cute!`);

  return message.channel.send(`${message.author} cuddles ${member.user} with a soft gentle embrace!`);
  }
  
  
  //Snuggle
  if(command === "snuggle" || command === "snuggles") {
	  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
   if(!member)
   return message.reply("You can't snuggle with nothing!");
   if(isSelfTest())
    return message.channel.send(`${message.author} **snuggles** with themselves!`);

  return message.channel.send(`${message.author} snuggles ${member.user} intimately~ https://i.imgur.com/uGuzkPD.gif`);
  }
  
  //Bite
  if(command === "bite" || command === "bites") {
	  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
   if(!member)
   return message.reply("You bite threateningly.");
   if(isSelfTest())
    return message.channel.send(`${message.author} just bit themselves! Ouch!`);

  return message.channel.send(`${message.author} bit ${member.user}! *Yum~* https://i.pinimg.com/originals/6b/e7/af/6be7aff1e380d160a12b24a9c7e84c31.gif`);
  }
  
  
  //Dance
  if(command === "dance" || command === "dances") {
	  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
   if(!member)
   return message.reply("You begin to breakdance on the road! https://media1.tenor.com/images/82ba2ebec2c02fc886427c24ab7650aa/tenor.gif?itemid=3597110");
   if(isSelfTest())
    return message.channel.send(`${message.author} started to dance! https://orig00.deviantart.net/a046/f/2009/210/3/6/caramell_dansen_fox_by_bella_the_eevee.gif`);

  return message.channel.send(`${message.author} dances with ${member.user}! https://i.kym-cdn.com/photos/images/original/000/167/675/52494fa289fb8a2ca9ee67d622f528b9.gif`);
  }
  
  //Run
  if(command === "run") {
	  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
   if(!member)
   return message.reply("You can run, but you can't hide!");
   if(isSelfTest())
    return message.channel.send(`${message.author} tried to run from themselves, but nothing happened...`);

  return message.channel.send(`${message.author} sprinted as fast as they possibly could from ${member.user} https://gph.is/2bXjvUL `);
  }
    
	//Pillow fight!
 if(command === "pillowfight") {
	  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
   if(!member)
   return message.reply("Gotta have a pillow fight with someone you know!");
   if(isSelfTest())
    return message.channel.send(`${message.author} You can't pillow fight alone!`);

  return message.channel.send(`${message.author} beat ${member.user} with pillows! https://i.gifer.com/3NnUR.gif`);
  }
   
   //Fight
if(command === "fight") {
	  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
   if(!member)
   return message.reply("Can't fight nothing");
   if(isSelfTest())
    return message.channel.send(`${message.author} fights with themselves under their breath.`);

  return message.channel.send(`${message.author} picked a fight with ${member.user} https://media.giphy.com/media/DzZ93uqQSleFy/giphy.gif`);
  }
  
     //Scratch
if(command === "fight") {
	  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
   if(!member)
   return message.reply("You look weird scratching the air, why don't you try *scratch someone?*");
   if(isSelfTest())
    return message.channel.send(`${message.author} Scratched themselves! `);

  return message.channel.send(`${message.author} gave ${member.user} a nice good scratch! https://i.gifer.com/3NnUd.gif`);
  }
  
  
  //Lenny
 if(command === "lenny") {
    message.channel.send(`( ͡° ͜ʖ ͡°)`);
  }
  
  //Stroll
 if(command === "stroll") {
    message.channel.send(`Strolled confidently! https://orig00.deviantart.net/c29c/f/2010/212/8/5/sora_sez_hakuna_matata_by_rasenth.gif`);
  }
  
  //Donate links
if(command === "donate") {
    message.channel.send(`You can donate here! By donating you are helping my development, all money left over will go to charity! https://www.patreon.com/octaviamedia OR http://ko-fi.com/octaviamedia`);
  }
    //Invite Link
if(command === "invite") {
    message.channel.send(`You can use this website to invite me to other servers! https://www.octaviamedia.se/octave`);
  }
    //Hide
 if(command === "hide") {
    message.channel.send(`${message.author} buried their face in their hood! https://i.pinimg.com/originals/b1/b1/16/b1b1168cceba31d2d878975e51d414e7.gif`);
  }
  
  //Credits
if(command === "credits") {
    message.channel.send("Ever wonder who created my sexy self? Of course you have! Big thank you to the following legends: \n`Polaris#0621` (Host) \n`Babaruski#6494` (Dev) \n`Gamr13#2860` (Dev + Scripter)\n`Eve# `\n`Bennkitsune#3724` (Gif hunter)\n`ɮ.#1001` (Gif hunter) \nand you! Yes you! Thank you for your support and donations, it means a lot that you guys would give me a chance to shine!");
    message.react("❤")
  }
  
  //smile
 if(command === "smile") {
    message.channel.send(`https://media.giphy.com/media/zrJGJD9mI9pWo/giphy.gif`);
  }
  
  //Shrug
  if(command === "shrug" || command === "shrugs") {
    message.channel.send(`${message.author} **shrugged** ¯\\_(ツ)_/¯ !`);
  }
  
  //Heart
if(command === "heart") {
    message.channel.send(`https://lh3.googleusercontent.com/-j4UcfhlTBvE/V8n85sToVaI/AAAAAAAAAbg/PRsiV8m9guMg0pGfAoJ7ABv0mBr76N3wQCJoC/w200-h200/image.gif`);
  }
  
  //Net Neutrality 
if(command === "nn") {
    message.channel.send(`https://media.giphy.com/media/xULW8F0QGCzdE3xr6U/giphy.mp4`);
  }
  
  //Who Pinged Me
if(command === "whopingedme") {
    message.channel.send(`https://media1.tenor.com/images/336247d99e395a1da9cccf111fba7c31/tenor.gif?itemid=11748348`);
  }
  
  //Scratch - Replace later on! ***************************************************************************************************************************************
if(command === "scratch") {
    message.channel.send(`https://media.giphy.com/media/hl1teFHQSnzcA/giphy.gif`);
  }  
  
  //Fart
if(command === "fart") {
    message.channel.send(`https://media.giphy.com/media/pZXqPpygK0lAk/giphy.gif`);
  }  
  
  //No u 
if(command === "nou") {
    message.channel.send(`https://i.imgur.com/xqDhNBF.gif`);
  }  
  
  //Roasted
if(command === "roasted") {
	message.channel.send(`https://i.gifer.com/9sIP.gif`);
}

  //Peck
if(command === "peck"){
	message.channel.send(`https://i.gifer.com/3NnUN.gif`)
}

  //Eyebrows
if(command === "brows"){
	message.channel.send(`https://i.gifer.com/3NnUO.gif`)
}

  //Whee!
if(command === "whee"){
	message.channel.send(`https://i.gifer.com/3NnUP.gif`)
}

  //Wag your tail!
if(command === "wag"){
	message.channel.send(`https://i.gifer.com/3NnUQ.gif`)
}
  
  //Woohoo!
if(command === "woohoo"){
	message.channel.send(`https://i.gifer.com/3NnUS.gif`)
}

  //Insane fur! O_o
if(command === "insane"){
	message.channel.send(`https://i.gifer.com/3NnUT.gif`)
}

  //Cry
if(command === "cry"){
	message.channel.send(`https://i.gifer.com/3NnUU.gif`)
}

  //Roll
if(command === "roll"){
	message.channel.send(`https://i.gifer.com/3NnUV.gif`)
}
  
  //U Wot M8?
if(command === "uwotm8"){
	message.channel.send(`https://i.gifer.com/3NnUY.gif`)
}
  
  //ew
if(command === "ew"){
	message.channel.send(`https://i.gifer.com/3NnUZ.gif`)
}
  
  //OwO What's this?
if(command === "owo"){
	message.channel.send(`https://i.gifer.com/3NnUa.gif`)
}
  
  //Someone just got TOLD!
if(command === "told"){
	message.channel.send(`https://i.gifer.com/3NnUb.gif`)
}
  
  //faint
if(command === "faint"){
	message.channel.send(`https://i.gifer.com/3NnUf.gif`)
}
  
  //head shake
if(command === "headshake"){
	message.channel.send(`https://i.gifer.com/3NnUg.gif`)
}
  
  //Grabby paws
if(command === "grabby"){
	message.channel.send(`https://i.gifer.com/3NnUi.gif`)
}

  //Table Flip! Yeah! Flip those tables!
if(command === "flip"){
	message.channel.send(`${message.author} is flipping tables like there's no tomorrow! https://i.gifer.com/3NnUx.gif`)
}
	

//NSFW Commands

//Spank
if (command === "spank") {
  console.log(message.channel.nsfw); // false

  if (message.channel.nsfw === false) {
    return message.reply(":warning: This channel isn't marked as NSFW.");
  }
 
   let member = message.mentions.members.first() || message.guild.members.get(args[0]);
   if(!member)
   return message.reply("You place your left paw in the air and make a spanking motion with your right paw!");
   if(isSelfTest()) return message.channel.send(`${message.author} **spanks** themselves...Alrighty then!`);

  return message.channel.send(`${message.author} **spanked** ${member.user}, ouch! https://static1.e621.net/data/2c/f2/2cf2a4372b9f85bb6af5e2dff42450df.gif`);
}

//Dislike! Dislike!!
if (command === "dislikesex"){
  console.log(message.channel.nsfw); // false

  if (message.channel.nsfw === false) {
    return message.reply(":warning: This channel isn't marked as NSFW.");
  }
  return message.channel.send(`https://i.gifer.com/3NnUW.gif`)
}

//Literal fucking furries!
if (command === "fuckingfurries"){
  console.log(message.channel.nsfw); // false

  if (message.channel.nsfw === false) {
    return message.reply(":warning: This channel isn't marked as NSFW.");
  }
  return message.channel.send(`https://i.gifer.com/3NnUX.gif`)
}

//Whip his ass good!
//Literal fucking furries!
if (command === "fuckingfurries"){
  console.log(message.channel.nsfw); // false

  if (message.channel.nsfw === false) {
    return message.reply(":warning: This channel isn't marked as NSFW.");
  }
  return message.channel.send(`https://i.gifer.com/3NnUc.gif`)
}

//Titty run
if (command === "titrun"){
  console.log(message.channel.nsfw); // false

  if (message.channel.nsfw === false) {
    return message.reply(":warning: This channel isn't marked as NSFW.");
  }
  return message.channel.send(`https://i.gifer.com/3NnUj.gif`)
}

//Blowjob
if (command === "blowjob"){
  console.log(message.channel.nsfw); // false

  if (message.channel.nsfw === false) {
    return message.reply(":warning: This channel isn't marked as NSFW.");
  }
  return message.channel.send(`https://i.gifer.com/3NnUk.gif`)
}

//Orgy
if (command === "orgy"){
  console.log(message.channel.nsfw); // false

  if (message.channel.nsfw === false) {
    return message.reply(":warning: This channel isn't marked as NSFW.");
  }
  return message.channel.send(`https://i.gifer.com/3NnUl.gif`)
}

//finger
if (command === "finger"){
  console.log(message.channel.nsfw); // false

  if (message.channel.nsfw === false) {
    return message.reply(":warning: This channel isn't marked as NSFW.");
  }
  return message.channel.send(`https://i.gifer.com/3NnUm.gif`)
}

//ride
if (command === "ride"){
  console.log(message.channel.nsfw); // false

  if (message.channel.nsfw === false) {
    return message.reply(":warning: This channel isn't marked as NSFW.");
  }
  return message.channel.send(`https://i.gifer.com/3NnUn.gif`)
}


if(command === "gay") {
  if (message.channel.nsfw === false) {
   return message.reply(":warning: This channel isn't marked as NSFW."); //Makes sure Its in a NSFW Channel >w<
  }
  Lewd(0,message);
}


if(command === "lesbian") {
  if (message.channel.nsfw === false) {
   return message.reply(":warning: This channel isn't marked as NSFW."); //Makes sure Its in a NSFW Channel >w<
  }
  Lewd(1,message);
}


if(command === "straight") {
  if (message.channel.nsfw === false) {
   return message.reply(":warning: This channel isn't marked as NSFW."); //Makes sure Its in a NSFW Channel >w<
  }
  Lewd(2,message);
}


});

client.login(config.token);