document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    const db = firebase.firestore();

    const productsRef = db.collection('products');

    const query = productsRef.orderBy('vendor', 'asc').limit(50);

    query.get().then(products => {
        products.forEach(doc => {
            data = doc.data();
            document.write(`${data.name} at $${data.price} from ${data.vendor} <br>`);
        })
    })
});

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(result => {
        const user = result.user;
        document.write(`Hello ${user.displayName}`);
        console.log(user);
    }).catch(console.log)
}