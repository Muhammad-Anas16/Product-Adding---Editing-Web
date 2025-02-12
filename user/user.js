import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'

import {

    getDocs,
    collection,
    query,
    where,

} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js'

import { auth, db } from "../firebase.js";

// Functions

const check = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;

            console.log("User => ", uid);

            myPost(uid);

        } else {
            console.log("User Not Found")
        }
    });
}

// const getInput = async (event) => {
//     event.preventDefault();
//     let data = JSON.parse(localStorage.getItem("postData"));

//     let { name, price, id } = data;

//     let p_Name = event.target[0].value;
//     let p_price = event.target[1].value;

//     console.log("UID of Edit Post", id);

//     try {
//         await updateDoc(doc(db, "product", id), {
//             name: p_Name,
//             price: p_price,
//         });

//         console.log("update done");
//         myPost();

//     } catch (error) {
//         console.error(error);
//     }

// }

const myPost = async (theId) => {

        console.log(theId);

}

// Get Elements


const tBody = document.getElementById("tBody");

check();