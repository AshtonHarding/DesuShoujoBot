/*------------------------*
 * hehcoin : The first    *
 * discord cryptocurrency *
 *------------------------*
 * github.com/AshtonHarding
 *------------------------*/

/* Variables */
const coinDb = 'hehcoin_users.csv';
const discordStatus = 'with self';
const help_url = 'https://github.com/AshtonHarding/DesuShoujoBot/' + 
               'blob/master/readme.md';
const Discord = require("discord.js");
const qcBot = new Discord.Client();
const config = require("./config.json");
var max_mine = 1000; // Maximum released every 15mins.
var last = new Date();

function loadHehCSV()
{ /* Loads data into global arrays */
  return new Promise(resolve =>
  {
    var user_array = [];
    //open coinDb &&
    let readline = require('readline').createInterface({input: require('fs').createReadStream(coinDb)});
    //put into `heh_db_ara`
    readline.on('line', function(line)
    {
      var tmp = line.split(',');
      tmp[1] = parseInt(tmp[1]);
      user_array.push({'user': tmp[0], 'coin':tmp[1]});
    });
    setTimeout(() =>
    {
      console.log("[hehcoin] database loaded. Proceeding to discord...");
      resolve(user_array);
    }, 200);
  });
}

function discordBot(heh_db_arr)
{ /* The bot */
  qcBot.on("ready", () => {
    console.log('[Discord] qcBot operational.');
    // don't be lewd, we're adding features.
    qcBot.user.setPresence({game:{ name:discordStatus , type: 0} });
    qcBot.user.setStatus("online");
    //Run this every 15 minutes
    var timelimit = 900000; // {900000 = 15 minutes}
    var interval = setInterval(function ()
    {
      last = new Date();
      var last_hr = last.getHours();
      var last_min = last.getMinutes();
      last_time = [last_hr, last_min];
      // Distribute coins to everyone
      let amt_to_dist;
      if((max_mine / heh_db_arr.length) < 1){
        amt_to_dist = 1;
      }else{
        amt_to_dist = max_mine / heh_db_arr.length;
      }
      for(var i = 0; i < heh_db_arr.length; i++){
        heh_db_arr[i].coin += amt_to_dist;
      }

      // Update
      var fs = require('fs');
      var file_updater = fs.createWriteStream(coinDb); // open
      file_updater.on('error', function(err){ console.log('[discord]',err) }); //err
      for(var i = 0; i < heh_db_arr.length; i++){
        file_updater.write(heh_db_arr[i].user +',' + heh_db_arr[i].coin + '\n');
      }
      file_updater.write('\n'); // Need that Empty line...
      //heh_db_arr.forEach(function(v){ file_updater.write(v.join(',') + '\n'); }); //write to
      file_updater.end(); // close file
      // Completed.
      console.log('[' + last_time[0] + ':' + last_time[1] + '] [hehcoin] Database updated.');
    }, timelimit);
  });

  // Console errors
  process.on("unhandledRejection", (error) => { console.error('[discord]',error)});

  // Bot Responses
  qcBot.on("message", (message) => {

    // no longer case sensitive
    var lc_msg = message.content.toLowerCase();

    // Ignore self?
    if(message.author.qcBot){ return };

    if(lc_msg.startsWith(config.prefix + "foo"))
    {
      // Test command.
      console.log("[discord] bar");
      message.channel.send("bar");
    }

    /*------------------*
     * qcBot stuff
     *-------------------*/

    if(lc_msg.includes("fix bot"))
    {
      message.channel.send("Fix yourself. Anyone wanna see my cosplay?");
    }

    if(lc_msg.startsWith(config.prefix + "help"))
    {
      // Sends users to the github
      if(message.author.bot)
      {
        console.log("lolno help for bots!");
      }
      else{
        message.channel.send('```\n+joinheh                   - register for your hehcoin wallet\n' +
                             '+mine                      - How much time until the next mine event\n' +
                             '+coins                     - tells you how many coins you currently have\n' +
                             '+sendcoin [user] [amount]  - Sends coins to someone.\n```');
      }
    }
 

    /*------------------*
     * hehcoin stuff
     *-------------------*/
    if(lc_msg.startsWith(config.prefix + "joinheh"))
    {
      let user = message.author.id;
      var user_exists = false;

      setTimeout(() =>
      {
        for(var i = 0; i < heh_db_arr.length; i++)
        {
          if(user === heh_db_arr[i].user)
          {
            user_exists = true;
          }
        }
        if(user_exists){
          console.log("[hehcoin] user already exists");
          message.channel.send('You\'ve already registered,',user);
          return;
        }else{
          console.log('[hehcoin] registering new user...');
          user = user.replace(/\D/g,'');
          let tmp = [user, 0];
          heh_db_arr.push({'user': tmp[0], 'coin':tmp[1]});
          message.channel.send('Welcome to <:heh:387033071226060810> coin,',user);
          return;
        }
      }, 100);
    }

    if(lc_msg.startsWith(config.prefix + "sendcoin"))
    {
      var senderCoinTotal;
      var recipientCoinTotal;
      var recipientExists = false;
      let parsed_message = lc_msg;
      //lol yet more vars.
      var senderNum;
      var recipientNum;
      /* Parses the message properly. */
      parsed_message = parsed_message.split(' ');
      let recipient = parsed_message[1].replace('<@','').replace('>','');
      let sender = message.author.id;
      let sent_amt = parsed_message[2];
      var lazyCheck = false;
      try{ // It's for verifying the amount is a legal val.
        sent_amt = Number(sent_amt);
        sent_amt = Math.abs(sent_amt);
        lazyCheck = true;
      }catch(err){
        pass;
      }
      console.log('[hehcoin]',parsed_message);

      //Fix weird message bug here that prevents sending coins.
      recipient = recipient.replace(/\D/g,'');

      setTimeout(() =>
      {
        for(var i = 0; i < heh_db_arr.length; i++)
        {
          if(sender === heh_db_arr[i].user)
          {
            senderCoinTotal = heh_db_arr[i].coin;
            //console.log('[hehcoin] sender found', senderCoinTotal, '?',sent_amt);
            senderNum = i;
          }else if(recipient === heh_db_arr[i].user)
          {
            recipientCoinTotal = heh_db_arr[i].coin;
            console.log('[hehcoin] recipient found');
            recipientExists = true;
            recipientNum = i;
          }else{
            console.log('[debug] continuing...');
          }
        }
        /* Check if correct. */
        if(lazyCheck)
        { // is amt a correct value?
          console.log('[hehcoin] CORRECT AMOUNT');
          if(recipientExists)
          { // Check if recipient exists
            if(sent_amt <= senderCoinTotal)
            {
              //Add coin to recipient.
              console.log('[hehcoin] SENDING',sent_amt,'hehcoin');
              heh_db_arr[recipientNum].coin += sent_amt;
              heh_db_arr[senderNum].coin -= sent_amt;
              message.channel.send('<@'+message.author.id+
                                   '> sent ' + sent_amt + '<:heh:387033071226060810> coin '+
                                   'to <@' + recipient + '>');
              console.log('[hehcoin] SENT');
            }else{
              console.log('[hehcoin] Not enough hehcoins.');
              message.channel.send('<@'+message.author.id+
                                   '> not enough <:heh:387033071226060810> coin.'+
                                   'use `+coins` for your total');
            }
          }else{
            console.log('[hehcoin] Recipient doesn\'t exist',recipient);
            message.channel.send('Hey <@'+message.author.id+
                                 '> that user not a <:heh:387033071226060810> account holder.' +
                                 'join via `+joinheh`');
          }
        }else{
          message.channel.send('<@'+message.author.id+'>: `+sendcoin @user amount`');
          console.log('[hehcoin] NOT A NUMBER');
        }
      }, 0); // LOL 0?
    }

    if(lc_msg.startsWith(config.prefix + "coins"))
    {
      let coinTotal;
      setTimeout(() =>
      {
        for(var i = 0; i < heh_db_arr.length; i++)
        {
          if(message.author.id === heh_db_arr[i].user)
          {
            coinTotal = heh_db_arr[i].coin;
            console.log('[hehcoin]',coinTotal);
          }
        }

        // undefined
        if(coinTotal == undefined){
          message.channel.send('<@' + message.author.id + '> hasn\'t joined yet. ' + 
                               'type `+joinheh` to join');
        }else{
          message.channel.send('<@' + message.author.id + '> has ' +
                               coinTotal + ' <:heh:387033071226060810> coins');
        // Checks how many coins you have
          console.log('[hehcoin] <@' + message.author.id + '> has ' +
                      coinTotal + ' \:heh: coins');
        }
      }, 0);

    }
    if(lc_msg.startsWith(config.prefix + "mine"))
    {
      var diff = Math.floor(900 + (last - (new Date())) / 1000); // 900 = 15 mins in seconds

      console.log('Seconds left',diff);
      
      
      // Checks when the next block is mined
      console.log("[hehcoin]"+ diff + " seconds remaining until next block");
      message.channel.send('\:hammer: Next block in...' +
                           diff + ' seconds \:hammer:');
    }
  });
  qcBot.login(config.token);
}

async function main()
{
  var heh_db_arr = await loadHehCSV();
  discordBot(heh_db_arr); // Run after the initial load
}

main();
