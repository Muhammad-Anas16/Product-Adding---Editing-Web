import { auth, sendPasswordResetEmail } from "../../firebase.js";

const onEnter = (event) => {
    let key = event?.key;
    let email;

    if (key == `Enter`) {
        email = resetInp.value;
        console.log("email => ", email);
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('Password reset email sent!');
            })
            .catch((error) => {
                alert(error.message)
            });
        console.log(email);
        resetInp.value = "";
    }

}

const goToLoginPageFunc = () => {
    window.location.assign("/form/login/login.html");
}

const goToLoginPage = document.getElementById("goToLoginPage");
goToLoginPage.addEventListener("click", goToLoginPageFunc);

const resetInp = document.getElementById("Forget_Password_Email");
resetInp.addEventListener("keydown", onEnter);