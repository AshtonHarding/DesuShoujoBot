# qcBot
-------------------
Currently in [BETA]

Checkout [the whitepaper](hehcoin.pdf)

I still have a lot to do. But it does technically mine
and you can trade. 

## TODO

-[x] make `hehcoin` db (prolly csv)

-[x] Generate coins every 15 minutes

-[ ] ONLINE ONLY MINING

-[ ] Give coins arbitrary usd value (every 30 min)

-[x] cmd:`+sendcoins {USER} {AMOUNT}`

-[x] cmd: `+coins`

-[ ] cmd: `+coinworth`

-[ ] Add admin commands {Send message to all servers/channels}

-[ ] Host bot on my vps

## Commands

* `+help` -> Sends you here
* `+foo` -> Tests bot
* `+cass :fastsmug:` -> rabbit's command


-------------------

##### hehcoin

* `+joinheh` -> Register to hehcoin. 
* `+mine` -> Tells you how long until the next block. 
* `+coins` -> Tells you how many coins you have
* `+sendcoin [user] [amount]` -> Send coins to someone


## hehcoin info


#### How it works

Every 15 minutes. Distributes a block of 1000 hehcoins to all
online users. (Maybe use weight for activity?)

The user csv will be as follows:

```
{user_id}, {hehcoins} \n
```

Really simple. I won't have a blockchain (for now?) but
maybe I'll design a prototype or something. Although, it's not
really needed atm. Besides this won't be decentralized (atm) until
down the line.. But if I do make a blockchain, I'll give do giant split
and some balancing.

note: This is not "per server" but just in general. If you're on a server
that has this bot, you're collecting the coins in that way. Your wallet is
your userid.

### For me to make this work

For Mining:
0.) Get user online list // guild.presences.status (if not "offline")

1.) Get user.ids

2.) divide (hehcoins_generated / online_users_len)

3.) log the amount given.

4.) Wait (:00, :15, :30, :45) and go to 0.

For Trading:

pretty obv.

