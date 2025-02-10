import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'

import {


} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js'

import { auth, db } from '../firebase';

const check = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log("User => ", user);

        } else {
            console.log("User Not Found")
        }
    });
}

const getInput = async (event) => {
    event.preventDefault();
    let data = JSON.parse(localStorage.getItem("postData"));

    let { name, price, id } = data;

    console.log("UID of Edit Post", id);
    console.log(name)

    // try {
    //     await updateDoc(doc(db, "product", id), {
    //         name: p_Name,
    //         price: p_price,
    //     });

    //     console.log("update done");
    //     myPost();

    // } catch (error) {
    //     console.error(error);
    // }

}




check();