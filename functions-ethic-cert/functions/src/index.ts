import * as functions from 'firebase-functions';

const admin = require('firebase-admin')
const axios = require('axios');

admin.initializeApp();
let db = admin.firestore();
// cd functions, npm run deploy

const productsEndpoint = "products.json?fields=id,title,vendor&limit=95";


function baseUrl() {
    return "https://" + functions.config().ethiccertshopify.key + ":" + functions.config().ethiccertshopify.password + 
            "@ethic-marketplace.myshopify.com/admin/api/2020-01/";
}

exports.updateDatabase = functions.pubsub.schedule('every 5 minutes').onRun(async (context) => {
    console.log('updating database on every five mintues frequency');
    
    console.log("axios start");
    const response = await axios.get(baseUrl() + productsEndpoint);

    var key;
    var products = response.data.products;
    for (key in products) {
        var product = products[key];
        console.log(product);
        newDocument(product.id, product.title, product.vendor);
        
    }

    console.log('return NULL');
    return null;

})



function newDocument(id: string, title: string, vendor: string) {

    let docRef = db.collection('products').doc(id.toString());
    let vendorRef = db.collection('vendors').doc(vendor);
    vendorRef.set({
        name: vendor
    }, {merge: true});

    docRef.set({
        name: title,
        vendor: vendor
    }, {merge: true});
}


