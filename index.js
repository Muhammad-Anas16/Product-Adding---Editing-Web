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

// const showData = (name, img, Price) => {

//     section.innerHTML = "";

const ShowData = (displayName, image, Price) => {
    let data = `<div class="w-full max-w-sm bg-[#111827] border border-white rounded-lg shadow-md">
        <a href="#">
            <img class="p-8 rounded-t-lg" src="${image}"
                alt="product image" />
        </a>
        <div class="px-5 pb-5">
            <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-white">${displayName}</h5>
            </a>
            <div class="flex items-center mt-2.5 mb-5">
                <div class="flex items-center space-x-1">
                    <svg class="w-4 h-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                        viewBox="0 0 22 20">
                        <path
                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <span class="bg-blue-700 text-white text-xs font-semibold px-2.5 py-0.5 rounded">5.0</span>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-white">$${Price}</span>
                <a href="#"
                    class="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5">Add
                    to cart</a>
            </div>
        </div>
    </div>`;

    section += data;

}

const readData = async () => {
    try {
        // section.innerHTML = ""; // Clear the section before adding new data
        const querySnapshot = await getDocs(collection(db, "product"));
        querySnapshot.forEach((doc) => {
            let { Price, image, name } = doc.data();

            ShowData(name, image, Price);
            // console.log("name =>", name);
            // console.log("image =>", image);
            // console.log("Price =>", Price);

            console.log("All Post =>", doc.data());

        });
    } catch (error) {
        console.error(error);
    }
}

// Add Event 

let loginBtn = document.getElementById("sign_In"); // go to Login Page

let section = document.getElementById("sec1");

console.log(section);

// let displayName = document.getElementById("displayName");
// let photoURL = document.getElementById("photoURL");

// Call Functions

checkUser();

readData();

