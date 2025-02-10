import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'

import {

    getDocs,
    collection,
    query,
    where,
    doc,
    updateDoc,

} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js'

import { auth, db } from "../firebase.js";

// Functions

const check = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log("User => ", user);

            myPost(uid);

        } else {
            console.log("User Not Found")
        }
    });
}

const getInput = async (event) => {
    event.preventDefault();
    let data = JSON.parse(localStorage.getItem("postData"));

    let { name, price, id } = data;

    let p_Name = event.target[0].value;
    let p_price = event.target[1].value;

    console.log("UID of Edit Post", id);

    try {
        await updateDoc(doc(db, "product", id), {
            name: p_Name,
            price: p_price,
        });

        console.log("update done");
        myPost();

        popUp.style.display = "none";
        sec1.style.display = "flex";
    } catch (error) {
        console.error(error);
    }

}

const myPost = async (theId) => {
    try {

        const q = query(collection(db, "product"), where("uid", "==", theId));
        const querySnapshot = await getDocs(q);
        tBody.innerHTML = "";
        querySnapshot.forEach((product) => {

            // console.log(product.data());
            let { name, price, cetagory } = product.data();
            let tr = document.createElement("tr");
            tr.classList = "border-b border-white";
            tr.innerHTML = `
            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap border-white">
                            ${name}"
                        </th>
                        <td class="px-6 py-4 border-r border-white">$${price}</td>
                        <td class="px-6 py-4 text-right">
                            <span id="${product.id}" class="font-medium text-blue-400 hover:underline">Edit</span>
                        </td>
            `;

            localStorage.setItem("postData", JSON.stringify({
                name,
                price,
                id: product.id,
            }))
            tBody.appendChild(tr);

            querySnapshot.forEach((product) => {
                let product_Btn = document.getElementById(`${product.id}`);
                product_Btn.addEventListener("click", () => {

                    console.log("UID of My Post =>", product_Btn.id);

                    let data = JSON.parse(localStorage.getItem("postData"));
                    let { name, price } = data;

                    let p_Name = document.getElementById("Product_Name");
                    let p_price = document.getElementById("Product_Price");

                    p_Name.value = name;
                    p_price.value = price;
                    
                    popUp.style.display = "flex";
                    sec1.style.display = "none";

                });

            });

        });

    }catch (err) {
        console.error(err);
    }
}

// Get Elements


const tBody = document.getElementById("tBody");

const popUp = document.getElementById("sec0");
const sec1 = document.getElementById("sec1");

check();

const update_Form = document.getElementById("update_Product_Form");
update_Form.addEventListener("submit", getInput);