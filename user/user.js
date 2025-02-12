import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'

import {

    collection,
    query,
    where,
    getDocs,

} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js'

import { auth, db } from "../firebase.js";

// Functions

const check = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;

            console.log("User is Already Login ");

            myPost(uid);

        } else {
            console.log("User Not Found");
        }
    });
};

const myPost = async (theId) => {

    try {
        
        console.log(theId)

    }
    catch (err) {

        console.error(err)

    };

};

// Get Elements


// const tBody = document.getElementById("tBody");

check();