var resset, oldmail;
$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            document.getElementById('oldemail').value = user.email;
        } 
    });

    document.getElementById('changeform').addEventListener('submit', resset);
    function resset(e) {
        e.preventDefault();
        oldmail = getInputValue('oldemail');
        firebase.database().ref().child("users").orderByChild("email").equalTo(oldmail).on("value", function(snapshot) {
            if (snapshot.exists()) {
                firebase.auth().sendPasswordResetEmail(oldmail).then(function () {
                    // Email sent.
                    alert("Un link per reimpostare la password viene inviato tramite e-mail, controllare e reimpostare la password!");
                }).catch(function (error) {
                    // An error happened.
                    alert("Mrfud:" + error);
                });
            } else {
                alert("Mrfud:e-mail non valido")
            }
        });
    }
});