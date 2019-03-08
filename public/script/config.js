// Initialize Firebase
var config = {
    apiKey: "AIzaSyB5vdfO32_NUaIwifoILgi5OhyigLZabzE",
    authDomain: "mrfudnewmodule-1203e.firebaseapp.com",
    databaseURL: "https://mrfudnewmodule-1203e.firebaseio.com",
    projectId: "mrfudnewmodule-1203e",
    storageBucket: "mrfudnewmodule-1203e.appspot.com",
    messagingSenderId: "671864414157"
  };
firebase.initializeApp(config);

function getInputValue(Id) {
    return document.getElementById(Id).value;
}

/*firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        document.getElementById('logged').innerHTML = "Connesso: " + user.email;
    }
});*/

function signout() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        window.location.href = "index.html";
    }).catch(function (error) {
        // An error happened.
        alert("Mrfud:" + error);
    });
}