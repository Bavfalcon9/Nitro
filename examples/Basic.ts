// to do: Modulate the library.
import Client from "../src/Client.ts";

const bot: Client = new Client();
if (bot === undefined) {
    console.error('Test failed');
} else {
    console.log('Test passed!');
}