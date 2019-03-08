var changemail;
$(document).ready(function () {
    var nome, cognome, email, telefono, attivita, indrizzo, ragioneSociale, accetto, password, subtime, freeversion;
    var oldmail, newmail, cnfpswrd, role;

    //Listen to the submit event
    document.getElementById('registerform').addEventListener('submit', submitForm);
    function submitForm(e) {

        e.preventDefault();
        nome = getInputValue('nome');
        cognome = getInputValue('cognome');
        email = getInputValue('email');
        password = getInputValue('passwrd');
        cnfpswrd = getInputValue('confpasswrd');
        telefono = getInputValue('telefono');
        attivita = getInputValue('tipoAttivita');
        indrizzo = getInputValue('indirizzoAttivita');
        ragioneSociale = getInputValue('ragioneSociale');
        accetto = getInputValue('accetto');
        subtime = + new Date(); // Unix stamped time
        freeversion = true; //// default true for freeversion
        role = 1;

        if (password != cnfpswrd) {
            alert("La password non corrisponde, controlla il campo della password");
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
                var userId = user.uid;
                //Here if you want you can sign in the user
                firebase.auth().onAuthStateChanged((user) => {
                    if (user.uid != 0 && user.email == email) {
                        writeUserData(user.uid, email, nome, cognome, telefono, attivita, indrizzo, ragioneSociale, accetto, subtime, freeversion, role);
                        sendEmailVerification();
                    }
                });

                //show alert
                //window.location.href = "welcome.html";
                document.querySelector('.alert').style.display = 'block';
                document.querySelector('.success').style.display = 'none';
                document.querySelector('.waiting').style.display = 'none';
                setTimeout(function () {
                    document.querySelector('.alert').style.display = 'none';
                    window.location.href = "index.html";
                }, 3000);
            }).catch(function (error) {
                //Handle error
                var errorCode = error.code;
                var errorMessage = error.message;
                alert("Mrfud:" + errorMessage);
                var userExist = firebase.auth().currentUser;
            });
        }
    }

    function writeUserData(userId, email, nome, cognome, telefono, attivita, indrizzo, ragioneSociale, accetto, subtime, freeversion, role) {
        // Get a reference to the database service
        var database = firebase.database().ref('users/' + userId);
        database.set({
            email: email,
            nome: nome,
            cognome: cognome,
            telefono: telefono,
            attivita: attivita,
            indrizzo: indrizzo,
            ragioneSociale: ragioneSociale,
            accetto: accetto,
            subTime: subtime,
            freeversion: freeversion,
            role: role
        });
    }

    function sendEmailVerification() {
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function () {
            /*document.querySelector('.verifyme').style.display = 'none';*/
            if (user.emailVerified) {
                document.querySelector('.waiting').style.display = 'none';
                document.querySelector('.success').style.display = 'block';
            } else {
                document.querySelector('.success').style.display = 'none';
                document.querySelector('.waiting').style.display = 'block';
            }
        }).catch(function (error) {
            alert(error);
        });
    }
});
