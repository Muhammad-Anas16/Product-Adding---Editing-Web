import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'

import {

    getDocs,
    collection,
    query,
    where,
    onSnapshot,

} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js'

import { auth, db } from "../firebase.js";

const check = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log(user);

            myPost(uid);

        } else {
            console.log("User Not Found")
        }
    });
}

const myPost = async(theId) => {
    try {

        const q =  query(collection(db, "product"), where("uid", "==", theId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((product) => {
            let showPost = document.createElement("div");     
            console.log("My Post =>", product.data()); 
            console.log("show =>", showPost);
          });

    } catch (err) {
        console.error(err);
    }
}



check();