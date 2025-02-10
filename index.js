// import {

//     collection,
//     getDocs,

// } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js'

import {
    auth,
    onAuthStateChanged,
    signOut,
    db,
    getDocs,
    collection,
} from "./firebase.js";

// Functions

const logOutAccount = () => { // Log_Out Account 

    signOut(auth).then(() => {

        window.location.assign("form/login/login.html");

    }).catch((error) => {

        alert(error.message);

    });

}

const checkUser = () => { // check if user sign In

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // displayName.innerHTML = user?.displayName;
            // photoURL.src = user?.photoURL;
            // photoURL.classList = "w-9 h-8 rounded-full overflow-hidden"

            // const user_login = user?.displayName;
            loginBtn.addEventListener("click", logOutAccount);
            loginBtn.innerText = `Sign Out`;
            console.log(user);

        } else {
            console.log("User Not Found");
            loginBtn.addEventListener("click", () => {
                window.location.assign("form/login/login.html");
            });
            loginBtn.innerText = `Sign In`;
        }
    });
}


const readData = async () => {
    try {
        section.innerHTML = ""; // Clear the section before adding new data
        const querySnapshot = await getDocs(collection(db, "product"));
        querySnapshot.forEach((doc) => {
            let { price, image, name, } = doc.data();

            console.log("doc.data() =>", doc.data());

            console.log(image);
            console.log(name);
            console.log(price);

            let show_Data_Div = document.createElement("div");
            show_Data_Div.classList = "lg:w-1/4 md:w-1/2 p-4 w-full";
            show_Data_Div.id = "Product_Card"
            show_Data_Div.innerHTML += `
            <a class="block relative h-48 rounded overflow-hidden">
    <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="${image}">
  </a>
  <div class="mt-4">
    <h3 class="text-white text-xs tracking-widest title-font mb-1">CETAGORY</h3>
    <h2 class="text-white title-font text-lg font-medium">${name}</h2>
    <p class="mt-1 text-white">$${price}.00</p>
  </div>
            `;

            console.log("div =>", show_Data_Div);

            section.appendChild(show_Data_Div);

        });
    } catch (error) {
        console.error(error);
    }
}

// Add Event 

let loginBtn = document.getElementById("sign_In"); // go to Login Page

let section = document.getElementById("sec1");

// Call Functions

checkUser();

readData();

