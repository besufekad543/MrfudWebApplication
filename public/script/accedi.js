$(document).ready(function () {
    var email, password;
    //Listen to the submit event
    document.getElementById('signform').addEventListener('submit', signin);
    function signin(e) {
        e.preventDefault();
        email = getInputValue('username');
        password = getInputValue('password');

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("Mrfud:" + errorMessage);
        });
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                if (firebase.auth().currentUser) {//.emailVerified
                    var readOneUser = firebase.database().ref('users/' + user.uid + '/' + 'role');
                    readOneUser.on('value', function (snapshot) {
                        if (snapshot.val() == 0) {
                            window.location.href = "admin.html";
                        } else if (snapshot.val() == 1) {
                            window.location.href = "mainmenu.html";
                        } else if (snapshot.val() == 2) {
                            window.location.href = "administratoreGrouppo.html";
                        }
                    });
                } else {
                    alert("Verifica il tuo indirizzo email prima di accedere");
                }
            }
        });
    }
});