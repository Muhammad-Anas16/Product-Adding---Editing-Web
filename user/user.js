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

const myPost = async (theId) => {
    try {

        const q = query(collection(db, "product"), where("uid", "==", theId));
        const querySnapshot = await getDocs(q);
        tBody.innerHTML = "";
        querySnapshot.forEach((product) => {

            let { name, Price } = product.data();
            let tr = document.createElement("tr");
            tr.classList = "border-b border-white";
            tr.innerHTML = `
            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                            ${name}"
                        </th>
                        <td class="px-6 py-4 border-r border-white">$${Price}</td>
                        <td class="px-6 py-4 text-right">
                            <a href="../Update_&_Delete/ud.html" class="font-medium text-blue-400 hover:underline">Edit</a>
                        </td>
            `;
            tBody.appendChild(tr);

        });

    } catch (err) {
        console.error(err);
    }
}


const tBody = document.getElementById("tBody");


check();