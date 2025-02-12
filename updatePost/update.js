import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'

import {
    updateDoc,
    doc,
    getDocs,
    collection,

} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js'

import { auth, db } from '../firebase.js';

const check = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            // console.log("User => ", user);
            console.log("User Login ");

        } else {
            console.log("User Not Found")
        }
    });
}

const getAllPost = async() => {
    const querySnapshot = await getDocs(collection(db, "product"));
    querySnapshot.forEach((doc) => { 
        console.log(doc.id);
        console.log(doc.data());
     })
}

const getInput = async (event) => {
    event.preventDefault();

    product_Btn.innerText = "Updating...";

    // Retrieve data from localStorage
    let data = JSON.parse(localStorage.getItem("postData"));

    if (!data || !data.id) {
        console.error("Product ID is missing!");
        product_Btn.innerText = "Update Product";
        return;
    }

    let id = data.id; // Extract the product ID

    try {
        await updateDoc(doc(db, "product", id), {
            name: product_Name.value,
            price: product_Price.value,
        });

        product_Btn.innerText = "Update Product";
        console.log("update done");
        localStorage.removeItem("postData");
        window.location.href = "/index.html"; // Correcting window redirection

    } catch (error) {
        console.error(error);
    }
};

check();

let data = JSON.parse(localStorage.getItem("postData"))

let product_Name = document.getElementById("Product_Name");
let product_Price = document.getElementById("Product_Price");
let product_File = document.getElementById("file_Uploaded");
let product_Btn = document.getElementById("update_Btn");

product_Name.value = data.name;
product_Price.value = data.price;

let update = document.getElementById("update_Product_Form");
// update.addEventListener("submit", getInput);