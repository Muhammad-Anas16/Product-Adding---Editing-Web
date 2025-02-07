
import {

    auth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    db,
    collection,
    addDoc,
    updateProfile,

} from "../../firebase.js";


// Function

let checkUser = () => { // check if user sign In

    onAuthStateChanged(auth, (user) => {
        if (user) {

            console.log(user);
            // window.location.replace("/index.html");

        } else {
            console.log("User Not Found");
        }
    });
}

checkUser();

let signUp_User = async (event) => {

    event.preventDefault();

    let btn = (event.target[4]);
    btn.disabled = true;
    btn.innerText = "Loading..."

    let displayName = (event.target[0].value);
    let email = (event.target[1].value);
    let phoneNumber = (event.target[2].value);
    let password = (event.target[3].value);
    let photoURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwq-QgDNZh6feEWndoETeXuE1_TebPF77uhBIRtymuh5ke5E0iq3RiUqkc-R335fN3aVU&usqp=CAU";

    try {

        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        // console.log("user => ", userCredential);
        const user = userCredential?.user;
        const { uid } = userCredential?.user

        localStorage.setItem("uid", uid);

        await updateProfile(auth.currentUser, {
            displayName: displayName,
            photoURL: photoURL,
        });

        const docRef = await addDoc(collection(db, "users"), {
            displayName,
            email,
            phoneNumber,
            photoURL,
            uid,
        });

        console.log("Profile updated successfully!");


        btn.disabled = false;
        btn.innerText = "Submit"

        setInterval(window.location.replace("/index.html"), 10000);

    } catch (err) {
        // alert(err.message);
        console.log(err.message);
        btn.disabled = false;
        btn.innerText = "Submit"
    }

}

const signUp = document.getElementById("signUp_form");
signUp.addEventListener("submit", signUp_User);