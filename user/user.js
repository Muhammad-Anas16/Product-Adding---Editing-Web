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

            // console.log("User is Already Login ", user);
            console.log("User is Already Login ");
            getAllPost(uid);
            // console.log(uid);
            // myPost(uid);

        } else {
            console.log("User Not Found");
        }
    });
};

const getAllPost = async (theId) => {

    try {

        console.log(theId);

        const querySnapshot = await getDocs(collection(db, "product"));
        querySnapshot.forEach((doc) => {
            // console.log(doc.id);
            console.log(doc.data());
        })

    }
    catch (err) {

        console.error(err)

    };
}

// const myPost = async (theId) => {


//     try {

//         console.log("User UID in My Post =>", theId);

//         const q = query(collection(db, "product"), where("uid", "==", theId));
//         const querySnapshot = await getDocs(q);

//         querySnapshot.forEach((doc) => {

//             // console.log(doc.id);
//             console.log(doc.data());

//         });


//     }
//     catch (err) {

//         console.error(err)

//     };

// };

// Get Elements


// const tBody = document.getElementById("tBody");

check();
