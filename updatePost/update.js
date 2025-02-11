import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'

import {
    updateDoc,
    doc,

} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js'

import { auth, db } from '../firebase.js';

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
    // try {
    product_Btn.innerText = "Updating...";
    await updateDoc(doc(db, "product", `${id}`), {
        name: product_Name,
        price: product_Price,
    });

    product_Btn.innerText = "Update Product";
    console.log("update done");
    localStorage.removeItem("postData");

    // } catch (error) {
    //     console.error(error);
    // }

}

check();

const data = JSON.parse(localStorage.getItem("postData")); // get data from localstorage
const { name, price, id } = data; // Destructure Data

let product_Name = document.getElementById("Product_Name");
let product_Price = document.getElementById("Product_Price");
let product_File = document.getElementById("file_Uploaded");
let product_Btn = document.getElementById("update_Btn");

product_Name.value = name;
product_Price.value = price;


const update = document.getElementById("update_Product_Form");
update.addEventListener("submit", getInput);