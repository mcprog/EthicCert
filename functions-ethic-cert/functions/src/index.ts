import * as functions from 'firebase-functions';
const axios = require('axios');

// cd functions, npm run deploy



exports.updateDatabase = functions.pubsub.schedule('every 5 minutes').onRun((context) => {
    console.log('updating database on every five mintues frequency');

    getData().then((response: any) => {
        if (response.data.message) {
            console.log(`Got ${Object.entries(response.data.message).length} brees`);
        }
    }).catch((error: any) => {
        console.log(error);
    })
    return null;
})

const getData = () => {
    try {
        return axios.get('https://dog.ceo/api/breeds/list/all');
    } catch (error) {
        console.error(error);
    }
}

