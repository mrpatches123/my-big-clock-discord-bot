import { Client, GatewayIntentBits, ClientOptions, Events } from "discord.js";

const { BOTAPIKEY } = process.env;

if (!BOTAPIKEY) throw new Error("BOTAPIKEY is not defined");
const client = new Client({ intents: [GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent] });
client.login(BOTAPIKEY);
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.VoiceStateUpdate, (oldState, newState) => {
	const newUserChannel = newState.channel;
	const oldUserChannel = oldState.channel;

	// Check if a user joined a voice channel
	if (newUserChannel && !oldUserChannel) {
		console.log(`${newState?.member?.user?.tag} joined the voice channel: ${newUserChannel.name}`);
	}

	// Check if a user left a voice channel
	if (oldUserChannel && !newUserChannel) {
		console.log(`${oldState?.member?.user?.tag} left the voice channel: ${oldUserChannel.name}`);
	}
});