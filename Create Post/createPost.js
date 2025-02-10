import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'

import {

    addDoc,
    collection,

} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js'

import { auth, db } from "../firebase.js";

const check = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {

            console.log(user);
            const uid = user.uid;

        } else {
            console.log("User Not Found");
        }
    });
}

const add_Data = async (event) => {
    event.preventDefault();
    let p_Name = event.target[0].value;
    let p_Price = event.target[1].value;
    let p_File = event.target[2];
    let p_Btn = event.target[3];

    console.log(" p_Name =>", p_Name);
    // console.log(" p_Cetagory =>", p_Cetagory);
    console.log(" p_Price =>", p_Price);
    console.log(" p_File =>", p_File);
    console.log(" p_Btn =>", p_Btn);

    p_Btn.disabled = true;
    p_Btn.innerText = "Creating Your Product...";
    p_Btn.style.background = "#1E429F";
    try {

        const docRef = await addDoc(collection(db, "product"), {
            name: p_Name.toUpperCase(),
            price: p_Price.toUpperCase(),
            image: "https://www.productplan.com/uploads/2018/08/product-development.png",
            uid: localStorage.getItem("uid"),
        });
        console.log("Document written with ID: ", docRef.id);

        localStorage.removeItem("uid");
        p_Btn.disabled = false;
        p_Btn.innerText = "Create Product";
        p_Btn.style.background = "#1A56DB";

        window.location.replace("../index.html");
    } catch (err) {
        console.error(err);
        p_Btn.disabled = false;
        p_Btn.innerText = "Create Product";
        p_Btn.style.background = "#1A56DB";
    }
}

// Run Function

check();

const add_Product = document.getElementById("add_Product_Form");
add_Product.addEventListener("submit", add_Data);