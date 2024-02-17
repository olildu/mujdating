import { uid, currentUserCookie, initializeUid, getUserMatchedList } from './main.js';  

const client = new window.Appwrite.Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65b008483418c13c2e82'); // Replace this with your project ID

const functions = new window.Appwrite.Functions(client);

await initializeUid(); 


export async function saveUserFromPlace(placeData) {
    const data = {
        uid: uid,
        type: "uploadTagData",
        key: currentUserCookie,
        value: placeData,
        keyToUpdate: "fromPlace"
    };

    const execution = await functions.createExecution(
        '65b14d8eef7777411400', // Replace this with your function ID
        JSON.stringify(data)
    );

    console.log(execution);
}