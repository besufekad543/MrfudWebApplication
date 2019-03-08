var selval = false;
var stdid = 0;
var k = 0;
var txtOne;
var myFunction;
var prodottoLoad, produttoreLoad, IdLoad;
var _scannerIsRunning = false;
var userId;
var fg = false;
function setOptions(s) {
    selval = s[s.selectedIndex].value;
}

$(document).ready(function () {
    var prodotto, prodottore, revisionato, catagoria, scadenzaspec, format, codicebarre;
    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            var content = '';
            var dataVal = '';
            userId = user.uid;
            var leadsRef = firebase.database().ref('standardizzazione').orderByChild('produttore');
            leadsRef.on('value', function (snapshot) {

                snapshot.forEach(element => {
                    var key = element.key;
                    var val = element.val();
                    if (val.revisionato == false) {
                        k++;
                        content += '<tr>';
                        content += '<td class="idhide">' + key + '</td>';
                        content += '<td>' + val.produttore + '</td>';
                        content += '<td>' + val.nome + '</td>';
                        content += '<td>' + val.revisionato + '</td>';
                        content += '<td>' + val.categoria + '</td>';

                        if (val.scadenzaSpec == undefined) {
                            content += '<td>' + ' ' + '</td>';
                        } else {
                            content += '<td>' + val.scadenzaSpec + '</td>';
                        }

                        if (val.format == undefined) {
                            content += '<td>' + ' ' + '</td>';
                        } else {
                            content += '<td>' + val.format + '</td>';
                        }

                        if (val.text == undefined) {
                            content += '<td>' + ' ' + '</td>';
                        } else {
                            content += '<td>' + val.text + '</td>';
                        }
                        content += '<td>' + '<a href="" class="open-homeEvents btn btn-default btn-rounded mb-4"  data-id="ISBN-001122" data-toggle="modal" data-target="#modalContactForm">Modifica</a>' + '</td>';
                        content += '<td>' + '<img class="myimg" id="preview' + k + '" src="http://placehold.it/180" width="100px" height ="100px"></img>' + '</td>';
                        content += '</tr>';
                        previewImage(val.userId, val.nome, val.produttore, '#preview' + k, val.categoria);
                    }
                });
                $('#wrapper').append(content);
            });
        }
    });

    //Preview Image
    function previewImage(userId, prodotto, produttore, idOfImg, categoria) {
        if (categoria != 'Carni bovine') {
            firebase.database().ref('users/' + userId + '/rintracciabilita/' + produttore + '/' + prodotto).on('value', function (imgPrev) {
                imgPrev.forEach(imgp => {

                    if (imgp.key != undefined) { // + produttore + '/' + prodotto + '/' + imgp.key + '/' 
                        firebase.storage().ref(userId + '/rintracciabilita/' + imgp.val().nomeImmagine)
                            .getDownloadURL().then(function (url) {
                                if (url != undefined) {
                                    $(idOfImg).attr('src', url);

                                }
                            }).catch(function (error) {
                                switch (error.code) {
                                    case 'storage/object-not-found':
                                        console.log("Mrfud error:" + error.code);
                                        break;
                                    case 'storage/unauthorized':
                                        console.log("Mrfud error:" + error.code);
                                        break;
                                    case 'storage/canceled':
                                        console.log("Mrfud error:" + error.code);
                                        break;
                                    case 'storage/unknown':
                                        console.log("Mrfud error:" + error.code);
                                        break;
                                }
                            });
                    }
                });
            });
        } else {
            firebase.database().ref('users/' + userId + '/carnibovine/' + produttore + '/' + prodotto).on('value', function (imgPrev) {
                imgPrev.forEach(imgp => {

                    if (imgp.key != undefined) {//+ produttore + '/' + prodotto + '/' + imgp.key + '/'
                        firebase.storage().ref(userId + '/carnibovine/' + imgp.val().nomeImmagine)
                            .getDownloadURL().then(function (url) {
                                if (url != undefined) {
                                    $(idOfImg).attr('src', url);
                                }
                            }).catch(function (error) {
                                switch (error.code) {
                                    case 'storage/object-not-found':
                                        console.log("Mrfud error:" + error.code);
                                        break;
                                    case 'storage/unauthorized':
                                        console.log("Mrfud error:" + error.code);
                                        break;
                                    case 'storage/canceled':
                                        console.log("Mrfud error:" + error.code);
                                        break;
                                    case 'storage/unknown':
                                        console.log("Mrfud error:" + error.code);
                                        break;
                                }
                            });
                    }
                });
            });
        }
    }

    //Listen to the submit event
    document.getElementById('modifiyform').addEventListener('submit', ModifyProdotto);
    document.querySelector('.modalsucess').style.display = 'none';
    function ModifyProdotto(e) {

        e.preventDefault();
        var prodotto, prodottore, revisionato, categoria, id;
        var flag1, flag2, flag3, flag4;
        id = getInputValue('formid');
        prodotto = getInputValue('form34');
        produttore = getInputValue('form29');
        if (getInputValue('form32') === 'true') {
            revisionato = true;
        } else {
            revisionato = false;
        }
        categoria = getInputValue('form33');

        if (confirm('Sei sicuro di voler modificare il record esistente?')) {

            // Get a reference to the database service
            var database = firebase.database().ref('standardizzazione/' + id);
            console.log("updating others");
            var fgg = false;
            var fgg1 = false;
            database.on('value', function (impo) {
                var proareVal = impo.val().produttore;
                var proVal = impo.val().nome;
                var proCat = impo.val().catagoria;
                if (fgg == false) {

                    var database1 = firebase.database().ref('users/');
                    database1.on('value', function (snapshot) {

                        snapshot.forEach(element => {
                            var key = element.key;
                            var val = element.val();

                            if (val.rintracciabilita != undefined && categoria != 'Carni bovine') {
                                Object.keys(val.rintracciabilita).forEach(prore => {
                                    var database0 = firebase.database().ref('users/' + key + '/' + 'rintracciabilita');
                                    if (proareVal == prore) {

                                        var update = {};
                                        update[prore] = null;
                                        var database2 = firebase.database().ref('users/' + key + '/' + 'rintracciabilita' + '/' + prore + '/');
                                        database2.on('value', function (snapshot2) {
                                            snapshot2.forEach(prtto => {
                                                var product = prtto.key;
                                                var val1 = prtto.val();

                                                if (proVal == product) {
                                                    var update2 = {};
                                                    update2[product] = null;
                                                    update[produttore] = snapshot2.val();
                                                    var database3 = firebase.database().ref('users/' + key + '/' + 'rintracciabilita' + '/' + prore + '/' + product + '/');
                                                    database3.on('value', function (snapshot3) {
                                                        update2[prodotto] = snapshot3.val();
                                                    });
                                                    database2.update(update2);
                                                } else {
                                                    update[produttore] = snapshot2.val();

                                                }
                                            });

                                        });
                                        database0.update(update);
                                    }
                                });
                            }

                            if (val.carnibovine != undefined && categoria == 'Carni bovine') {
                                Object.keys(val.carnibovine).forEach(prore => {
                                    var database0 = firebase.database().ref('users/' + key + '/' + 'carnibovine');
                                    if (proareVal == prore) {
                                        var update = {};
                                        update[prore] = null;
                                        var database2 = firebase.database().ref('users/' + key + '/' + 'carnibovine' + '/' + prore + '/');
                                        database2.on('value', function (snapshot2) {
                                            snapshot2.forEach(prtto => {
                                                var product = prtto.key;
                                                var val1 = prtto.val();
                                                if (proVal == product) {

                                                    var update2 = {};
                                                    update2[product] = null;
                                                    update[produttore] = snapshot2.val();
                                                    var database3 = firebase.database().ref('users/' + key + '/' + 'carnibovine' + '/' + prore + '/' + product + '/');
                                                    database3.on('value', function (snapshot3) {
                                                        update2[prodotto] = snapshot3.val();
                                                    });
                                                    database2.update(update2);

                                                } else {
                                                    update[produttore] = snapshot2.val();
                                                }
                                            });
                                        });
                                        database0.update(update);
                                    }
                                });
                            }
                        });
                    });
                    fgg = true;
                }
            });


            database.update({
                categoria: categoria,
                nome: prodotto,
                produttore: produttore,
                revisionato: revisionato
            });


            if (revisionato) {
                //check if others products to remove
                var dbCon2 = firebase.database().ref('standardizzazione/').orderByChild('nome').equalTo(prodottoLoad);
                dbCon2.once("value", function (snapshot2) {
                    const updates = {};
                    snapshot2.forEach(function (child2) {
                        var idScan = child2.key;
                        var prodottoScan = child2.val().nome;
                        var produttoreScan = child2.val().produttore;
                        var prodottoCode = child2.val().text;

                        if (produttoreScan == produttoreLoad) {
                            if (idScan != IdLoad) {
                                firebase.database().ref('standardizzazione/').child(idScan).remove();
                                //alert("Deleted");
                            }
                        }
                    });
                });
            }

            var dbCon = firebase.database().ref('standardizzazione/').orderByChild('produttore').equalTo(produttoreLoad);
            dbCon.once("value", function (snapshot) {
                snapshot.forEach(function (child) {
                    child.ref.update({
                        produttore: produttore
                    });
                });
            });

            document.querySelector('.modalsucess').style.display = 'block';
            //$('#modalContactForm').modal('toggle');
            setTimeout(function () {
                window.location.reload();
            }, 500);
        }
    }

    $(document).on("click", ".open-homeEvents", function () {
        var tbl = document.getElementById("wrapper");
        var rowIndex = $(this).closest('tr').index();
        document.getElementById('formid').value = tbl.rows[rowIndex].cells[0].innerHTML;
        document.getElementById('form29').value = tbl.rows[rowIndex].cells[1].innerHTML;
        document.getElementById('form34').value = tbl.rows[rowIndex].cells[2].innerHTML;
        document.getElementById('form32').value = tbl.rows[rowIndex].cells[3].innerHTML;
        document.getElementById('form33').value = tbl.rows[rowIndex].cells[4].innerHTML;
        document.getElementById('scanner_input2').value = tbl.rows[rowIndex].cells[7].innerHTML;

        prodottoLoad = tbl.rows[rowIndex].cells[2].innerHTML;
        produttoreLoad = tbl.rows[rowIndex].cells[1].innerHTML;
        IdLoad = tbl.rows[rowIndex].cells[0].innerHTML;
    });


    $(document).on("click", ".myimg", function () {

        var tbl = document.getElementById("wrapper");
        var rowIndex = $(this).closest('tr').index();
        // Get the modal
        var modal = document.getElementById('myModal');
        // Get the image and insert it inside the modal - use its "alt" text as a caption
        var img = document.getElementById('preview' + rowIndex);
        var modalImg = document.getElementById("img01");
        var captionText = document.getElementById("caption");
        img.onclick = function () {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        }

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }
    });


    document.getElementById('searchform').addEventListener('submit', submitForm);
    function submitForm(e) {
        e.preventDefault();
        var verify = getInputValue('typoverify');
        var prodotto = getInputValue('prodotto');
        var produttore = getInputValue('prodottore');

        if (verify == "true" && prodotto != '' && produttore != '') {
            verify = true;
            search(verify, prodotto, produttore);
        }
        else if (verify == "true" && prodotto != '' && produttore == '') {
            verify = true;
            search(verify, prodotto, produttore);
        }
        else if (verify == "true" && prodotto == '' && produttore != '') {
            verify = true;
            search(verify, prodotto, produttore);
        }
        else if (verify == "true" && prodotto == '' && produttore == '') {
            verify = true;
            searchBoth(verify, prodotto, produttore);
        }
        else if (verify == "false" && prodotto != '' && produttore != '') {
            verify = false;
            search(verify, prodotto, produttore);
        }
        else if (verify == "false" && prodotto != '' && produttore == '') {
            verify = false;
            search(verify, prodotto, produttore);
        }
        else if (verify == "false" && prodotto == '' && produttore != '') {
            verify = false;
            search(verify, prodotto, produttore);
        }
        else if (verify == "false" && prodotto == '' && produttore == '') {
            verify = false;
            searchBoth(verify, prodotto, produttore);
        } else if (verify == "any" && prodotto != '' && produttore != '') {
            search(verify, prodotto, produttore);
        }
        else if (verify == "any" && prodotto != '' && produttore == '') {
            search(verify, prodotto, produttore);
        }
        else if (verify == "any" && prodotto == '' && produttore != '') {
            search(verify, prodotto, produttore);
        }
        else if (verify == "any" && prodotto == '' && produttore == '') {
            searchBoth(verify, prodotto, produttore);
        }
    }

    function searchBoth(verify, prodotto, produttore) {
        var dataVal = '';
        dataVal += '<table id="wrapper" class="table table-hover">';
        dataVal += '<tr id="tr">';
        dataVal += '<th>PRODOTTORE:</th>';
        dataVal += '<th>PRODOTTO:</th>';
        dataVal += '<th>REVISIONATO:</th>';
        dataVal += '<th>CATEGORIA:</th>';
        dataVal += '<th>SCADENZA SPECIFICA:</th>';
        dataVal += '<th>TIPO CODICE A BARRE</th>';
        dataVal += '<th>CODICE A BARRE</th>';
        dataVal += '<th></th>';
        if (verify == "any") {
            var k = 0;
            var leadsRef = firebase.database().ref('standardizzazione').orderByChild('produttore');
            leadsRef.on('value', function (snapshot) {
                snapshot.forEach(element => {
                    k++;
                    var key = element.key;
                    var val = element.val();

                    dataVal += '<tr>';
                    dataVal += '<td class="idhide">' + key + '</td>';
                    dataVal += '<td>' + val.produttore + '</td>';
                    dataVal += '<td>' + val.nome + '</td>';
                    dataVal += '<td>' + val.revisionato + '</td>';
                    dataVal += '<td>' + val.categoria + '</td>';

                    if (val.scadenzaSpec == undefined) {
                        dataVal += '<td>' + ' ' + '</td>';
                    } else {
                        dataVal += '<td>' + val.scadenzaSpec + '</td>';
                    }

                    if (val.format == undefined) {
                        dataVal += '<td>' + ' ' + '</td>';
                    } else {
                        dataVal += '<td>' + val.format + '</td>';
                    }

                    if (val.text == undefined) {
                        dataVal += '<td>' + ' ' + '</td>';
                    } else {
                        dataVal += '<td>' + val.text + '</td>';
                    }
                    dataVal += '<td>' + '<a href="" class="open-homeEvents btn btn-default btn-rounded mb-4"  data-id="ISBN-001122" data-toggle="modal" data-target="#modalContactForm">Modifica</a>' + '</td>';
                    dataVal += '<td>' + '<img class="prev" id="preview' + k + '" src="http://placehold.it/180" width="100px" height ="100px"></img>' + '</td>';
                    // dataVal += '<td>' + '<button class="cfmbtn btn btn-primary " id="confirma">Confirma</button>' + '</td>';
                    dataVal += '</tr>';
                    previewImage(val.userId, val.nome, val.produttore, '#preview' + k, val.categoria);
                });
                $('#wrapper').replaceWith(dataVal);
            });
        } else {
            var k = 0;
            var leadsRef = firebase.database().ref('standardizzazione').orderByChild('produttore');
            leadsRef.on('value', function (snapshot) {
                snapshot.forEach(element => {
                    var key = element.key;
                    var val = element.val();
                    if (val.revisionato == verify) {
                        k++;
                        dataVal += '<tr>';
                        dataVal += '<td class="idhide">' + key + '</td>';
                        dataVal += '<td>' + val.produttore + '</td>';
                        dataVal += '<td>' + val.nome + '</td>';
                        dataVal += '<td>' + val.revisionato + '</td>';
                        dataVal += '<td>' + val.categoria + '</td>';

                        if (val.scadenzaSpec == undefined) {
                            dataVal += '<td>' + ' ' + '</td>';
                        } else {
                            dataVal += '<td>' + val.scadenzaSpec + '</td>';
                        }

                        if (val.format == undefined) {
                            dataVal += '<td>' + ' ' + '</td>';
                        } else {
                            dataVal += '<td>' + val.format + '</td>';
                        }

                        if (val.text == undefined) {
                            dataVal += '<td>' + ' ' + '</td>';
                        } else {
                            dataVal += '<td>' + val.text + '</td>';
                        }

                        dataVal += '<td>' + '<a href="" class="open-homeEvents btn btn-default btn-rounded mb-4"  data-id="ISBN-001122" data-toggle="modal" data-target="#modalContactForm">Modifica</a>' + '</td>';
                        dataVal += '<td>' + '<img id="preview' + k + '" src="http://placehold.it/180" width="100px" height ="100px"></img>' + '</td>';

                        // dataVal += '<td>' + '<button class="cfmbtn btn btn-primary " id="confirma">Confirma</button>' + '</td>';
                        dataVal += '</tr>';
                        previewImage(val.userId, val.nome, val.produttore, '#preview' + k, val.categoria);
                    }
                });
                $('#wrapper').replaceWith(dataVal);
            });
        }
    }

    function search(verify, prodotto, produttore) {
        var dataVal = '';

        dataVal += '<table id="wrapper" class="table table-hover">';
        dataVal += '<tr id="tr">';
        dataVal += '<th>PRODOTTORE:</th>';
        dataVal += '<th>PRODOTTO:</th>';
        dataVal += '<th>REVISIONATO:</th>';
        dataVal += '<th>CATEGORIA:</th>';
        dataVal += '<th>SCADENZA SPECIFICA:</th>';
        dataVal += '<th>TIPO CODICE A BARRE</th>';
        dataVal += '<th>CODICE A BARRE</th>';
        dataVal += '<th></th>';

        if (verify == "any") {
            var k = 0;
            var leadsRef = firebase.database().ref('standardizzazione').orderByChild('produttore');
            leadsRef.on('value', function (snapshot) {
                snapshot.forEach(element => {
                    k++;
                    var key = element.key;
                    var val = element.val();
                    if (val.nome == prodotto && val.produttore == produttore) {

                        dataVal += '<tr>';
                        dataVal += '<td class="idhide">' + key + '</td>';
                        dataVal += '<td>' + val.produttore + '</td>';
                        dataVal += '<td>' + val.nome + '</td>';
                        dataVal += '<td>' + val.revisionato + '</td>';
                        dataVal += '<td>' + val.categoria + '</td>';

                        if (val.scadenzaSpec == undefined) {
                            dataVal += '<td>' + ' ' + '</td>';
                        } else {
                            dataVal += '<td>' + val.scadenzaSpec + '</td>';
                        }

                        if (val.format == undefined) {
                            dataVal += '<td>' + ' ' + '</td>';
                        } else {
                            dataVal += '<td>' + val.format + '</td>';
                        }

                        if (val.text == undefined) {
                            dataVal += '<td>' + ' ' + '</td>';
                        } else {
                            dataVal += '<td>' + val.text + '</td>';
                        }
                        dataVal += '<td>' + '<a href="" class="open-homeEvents btn btn-default btn-rounded mb-4"  data-id="ISBN-001122" data-toggle="modal" data-target="#modalContactForm">Modifica</a>' + '</td>';
                        dataVal += '<td>' + '<img id="preview' + k + '" src="http://placehold.it/180" width="100px" height ="100px"></img>' + '</td>';

                        //dataVal += '<td>' + '<button class="cfmbtn btn btn-primary " id="confirma">Confirma</button>' + '</td>';
                        dataVal += '</tr>';
                        previewImage(val.userId, val.nome, val.produttore, '#preview' + k, val.categoria);

                    } else if (val.nome != prodotto && val.produttore == produttore) {

                        dataVal += '<tr>';
                        dataVal += '<td class="idhide">' + key + '</td>';
                        dataVal += '<td>' + val.produttore + '</td>';
                        dataVal += '<td>' + val.nome + '</td>';
                        dataVal += '<td>' + val.revisionato + '</td>';
                        dataVal += '<td>' + val.categoria + '</td>';

                        if (val.scadenzaSpec == undefined) {
                            dataVal += '<td>' + ' ' + '</td>';
                        } else {
                            dataVal += '<td>' + val.scadenzaSpec + '</td>';
                        }

                        if (val.format == undefined) {
                            dataVal += '<td>' + ' ' + '</td>';
                        } else {
                            dataVal += '<td>' + val.format + '</td>';
                        }

                        if (val.text == undefined) {
                            dataVal += '<td>' + ' ' + '</td>';
                        } else {
                            dataVal += '<td>' + val.text + '</td>';
                        }

                        dataVal += '<td>' + '<a href="" class="open-homeEvents btn btn-default btn-rounded mb-4"  data-id="ISBN-001122" data-toggle="modal" data-target="#modalContactForm">Modifica</a>' + '</td>';
                        dataVal += '<td>' + '<img id="preview' + k + '" src="http://placehold.it/180" width="100px" height ="100px"></img>' + '</td>';

                        //dataVal += '<td>' + '<button class="cfmbtn btn btn-primary " id="confirma">Confirma</button>' + '</td>';
                        dataVal += '</tr>';
                        previewImage(val.userId, val.nome, val.produttore, '#preview' + k, val.categoria);

                    } else if (val.nome == prodotto && val.produttore != produttore) {
                        dataVal += '<tr>';
                        dataVal += '<td class="idhide">' + key + '</td>';
                        dataVal += '<td>' + val.produttore + '</td>';
                        dataVal += '<td>' + val.nome + '</td>';
                        dataVal += '<td>' + val.revisionato + '</td>';
                        dataVal += '<td>' + val.categoria + '</td>';

                        if (val.scadenzaSpec == undefined) {
                            dataVal += '<td>' + ' ' + '</td>';
                        } else {
                            dataVal += '<td>' + val.scadenzaSpec + '</td>';
                        }

                        if (val.format == undefined) {
                            dataVal += '<td>' + ' ' + '</td>';
                        } else {
                            dataVal += '<td>' + val.format + '</td>';
                        }

                        if (val.text == undefined) {
                            dataVal += '<td>' + ' ' + '</td>';
                        } else {
                            dataVal += '<td>' + val.text + '</td>';
                        }

                        dataVal += '<td>' + '<a href="" class="open-homeEvents btn btn-default btn-rounded mb-4"  data-id="ISBN-001122" data-toggle="modal" data-target="#modalContactForm">Modifica</a>' + '</td>';
                        dataVal += '<td>' + '<img id="preview' + k + '" src="http://placehold.it/180" width="100px" height ="100px"></img>' + '</td>';

                        //dataVal += '<td>' + '<button class="cfmbtn btn btn-primary " id="confirma">Confirma</button>' + '</td>';
                        dataVal += '</tr>';
                        previewImage(val.userId, val.nome, val.produttore, '#preview' + k, val.categoria);
                    }
                });
                $('#wrapper').replaceWith(dataVal);
            });
        } else {
            var k = 0;
            var leadsRef = firebase.database().ref('standardizzazione').orderByChild('produttore');
            leadsRef.on('value', function (snapshot) {
                snapshot.forEach(element => {

                    var key = element.key;
                    var val = element.val();
                    if (val.revisionato == verify) {
                        k++;
                        if (val.nome == prodotto && val.produttore == produttore) {

                            dataVal += '<tr>';
                            dataVal += '<td class="idhide">' + key + '</td>';
                            dataVal += '<td>' + val.produttore + '</td>';
                            dataVal += '<td>' + val.nome + '</td>';
                            dataVal += '<td>' + val.revisionato + '</td>';
                            dataVal += '<td>' + val.categoria + '</td>';

                            if (val.scadenzaSpec == undefined) {
                                dataVal += '<td>' + ' ' + '</td>';
                            } else {
                                dataVal += '<td>' + val.scadenzaSpec + '</td>';
                            }

                            if (val.format == undefined) {
                                dataVal += '<td>' + ' ' + '</td>';
                            } else {
                                dataVal += '<td>' + val.format + '</td>';
                            }

                            if (val.text == undefined) {
                                dataVal += '<td>' + ' ' + '</td>';
                            } else {
                                dataVal += '<td>' + val.text + '</td>';
                            }
                            dataVal += '<td>' + '<a href="" class="open-homeEvents btn btn-default btn-rounded mb-4"  data-id="ISBN-001122" data-toggle="modal" data-target="#modalContactForm">Modifica</a>' + '</td>';
                            dataVal += '<td>' + '<img id="preview' + k + '" src="http://placehold.it/180" width="100px" height ="100px"></img>' + '</td>';

                            //dataVal += '<td>' + '<button class="cfmbtn btn btn-primary " id="confirma">Confirma</button>' + '</td>';
                            dataVal += '</tr>';
                            previewImage(val.userId, val.nome, val.produttore, '#preview' + k, val.categoria);


                        } else if (val.nome != prodotto && val.produttore == produttore) {

                            dataVal += '<tr>';
                            dataVal += '<td class="idhide">' + key + '</td>';
                            dataVal += '<td>' + val.produttore + '</td>';
                            dataVal += '<td>' + val.nome + '</td>';
                            dataVal += '<td>' + val.revisionato + '</td>';
                            dataVal += '<td>' + val.categoria + '</td>';

                            if (val.scadenzaSpec == undefined) {
                                dataVal += '<td>' + ' ' + '</td>';
                            } else {
                                dataVal += '<td>' + val.scadenzaSpec + '</td>';
                            }

                            if (val.format == undefined) {
                                dataVal += '<td>' + ' ' + '</td>';
                            } else {
                                dataVal += '<td>' + val.format + '</td>';
                            }

                            if (val.text == undefined) {
                                dataVal += '<td>' + ' ' + '</td>';
                            } else {
                                dataVal += '<td>' + val.text + '</td>';
                            }

                            dataVal += '<td>' + '<a href="" class="open-homeEvents btn btn-default btn-rounded mb-4"  data-id="ISBN-001122" data-toggle="modal" data-target="#modalContactForm">Modifica</a>' + '</td>';
                            dataVal += '<td>' + '<img id="preview' + k + '" src="http://placehold.it/180" width="100px" height ="100px"></img>' + '</td>';

                            //dataVal += '<td>' + '<button class="cfmbtn btn btn-primary " id="confirma">Confirma</button>' + '</td>';
                            dataVal += '</tr>';
                            previewImage(val.userId, val.nome, val.produttore, '#preview' + k, val.categoria);

                        } else if (val.nome == prodotto && val.produttore != produttore) {
                            dataVal += '<tr>';
                            dataVal += '<td class="idhide">' + key + '</td>';
                            dataVal += '<td>' + val.produttore + '</td>';
                            dataVal += '<td>' + val.nome + '</td>';
                            dataVal += '<td>' + val.revisionato + '</td>';
                            dataVal += '<td>' + val.categoria + '</td>';

                            if (val.scadenzaSpec == undefined) {
                                dataVal += '<td>' + ' ' + '</td>';
                            } else {
                                dataVal += '<td>' + val.scadenzaSpec + '</td>';
                            }

                            if (val.format == undefined) {
                                dataVal += '<td>' + ' ' + '</td>';
                            } else {
                                dataVal += '<td>' + val.format + '</td>';
                            }

                            if (val.text == undefined) {
                                dataVal += '<td>' + ' ' + '</td>';
                            } else {
                                dataVal += '<td>' + val.text + '</td>';
                            }

                            dataVal += '<td>' + '<a href="" class="open-homeEvents btn btn-default btn-rounded mb-4"  data-id="ISBN-001122" data-toggle="modal" data-target="#modalContactForm">Modifica</a>' + '</td>';
                            dataVal += '<td>' + '<img id="preview' + k + '" src="http://placehold.it/180" width="100px" height ="100px"></img>' + '</td>';

                            //dataVal += '<td>' + '<button class="cfmbtn btn btn-primary " id="confirma">Confirma</button>' + '</td>';
                            dataVal += '</tr>';
                            previewImage(val.userId, val.nome, val.produttore, '#preview' + k, val.categoria);
                        }
                    }
                });
                $('#wrapper').replaceWith(dataVal);
            });
        }
    }

    liveSearch();
    //AJAX
    function liveSearch() {

        $.ajaxSetup({ cache: false });
        $('#prodotto').keyup(function () {
            $('#wrapper').html('');
            $('#state').val('');
            var searchField = $('#prodotto').val();
            var expression = new RegExp(searchField, "i");
            var k = 0;
            var dataVal = '';
            dataVal += '<table id="wrapper" class="table table-hover">';
            dataVal += '<tr id="tr">';
            dataVal += '<th>PRODOTTORE:</th>';
            dataVal += '<th>PRODOTTO:</th>';
            dataVal += '<th>REVISIONATO:</th>';
            dataVal += '<th>CATEGORIA:</th>';
            dataVal += '<th>SCADENZA SPECIFICA:</th>';
            dataVal += '<th>TIPO CODICE A BARRE</th>';
            dataVal += '<th>CODICE A BARRE</th>';
            dataVal += '<th></th>';

            var leadsRef = firebase.database().ref('standardizzazione').orderByChild('produttore');
            leadsRef.on('value', function (snapshot) {
                snapshot.forEach(element => {
                    k++;
                    var key = element.key;
                    var val = element.val();
                    if (val.nome.search(expression) != -1) {
                        dataVal += '<tr>';
                        dataVal += '<td class="idhide">' + key + '</td>';
                        dataVal += '<td>' + val.produttore + '</td>';
                        dataVal += '<td>' + val.nome + '</td>';
                        dataVal += '<td>' + val.revisionato + '</td>';
                        dataVal += '<td>' + val.categoria + '</td>';

                        if (val.scadenzaSpec == undefined) {
                            dataVal += '<td>' + ' ' + '</td>';
                        } else {
                            dataVal += '<td>' + val.scadenzaSpec + '</td>';
                        }

                        if (val.format == undefined) {
                            dataVal += '<td>' + ' ' + '</td>';
                        } else {
                            dataVal += '<td>' + val.format + '</td>';
                        }

                        if (val.text == undefined) {
                            dataVal += '<td>' + ' ' + '</td>';
                        } else {
                            dataVal += '<td>' + val.text + '</td>';
                        }

                        dataVal += '<td>' + '<a href="" class="open-homeEvents btn btn-default btn-rounded mb-4"  data-id="ISBN-001122" data-toggle="modal" data-target="#modalContactForm">Modifica</a>' + '</td>';
                        dataVal += '<td>' + '<img id="preview' + k + '" src="http://placehold.it/180" width="100px" height ="100px"></img>' + '</td>';

                        //dataVal += '<td>' + '<button class="cfmbtn btn btn-primary " id="confirma">Confirma</button>' + '</td>';
                        dataVal += '</tr>';
                        previewImage(val.userId, val.nome, val.produttore, '#preview' + k, val.categoria);

                    }
                });
                $('#wrapper').replaceWith(dataVal);
            });

        });

        $.ajaxSetup({ cache: false });
        $('#prodottore').keyup(function () {
            $('#wrapper').html('');
            $('#state').val('');
            var searchField = $('#prodottore').val();
            var expression = new RegExp(searchField, "i");

            var dataVal = '';
            var k = 0;
            dataVal += '<table id="wrapper" class="table table-hover">';
            dataVal += '<tr id="tr">';
            dataVal += '<th>PRODOTTORE:</th>';
            dataVal += '<th>PRODOTTO:</th>';
            dataVal += '<th>REVISIONATO:</th>';
            dataVal += '<th>CATEGORIA:</th>';
            dataVal += '<th>SCADENZA SPECIFICA:</th>';
            dataVal += '<th>TIPO CODICE A BARRE</th>';
            dataVal += '<th>CODICE A BARRE</th>';
            dataVal += '<th></th>';

            var leadsRef = firebase.database().ref('standardizzazione').orderByChild('produttore');
            leadsRef.on('value', function (snapshot) {
                snapshot.forEach(element => {
                    k++;
                    var key = element.key;
                    var val = element.val();
                    if (val.produttore.search(expression) != -1) {
                        dataVal += '<tr>';
                        dataVal += '<td class="idhide">' + key + '</td>';
                        dataVal += '<td>' + val.produttore + '</td>';
                        dataVal += '<td>' + val.nome + '</td>';
                        dataVal += '<td>' + val.revisionato + '</td>';
                        dataVal += '<td>' + val.categoria + '</td>';

                        if (val.scadenzaSpec == undefined) {
                            dataVal += '<td>' + ' ' + '</td>';
                        } else {
                            dataVal += '<td>' + val.scadenzaSpec + '</td>';
                        }

                        if (val.format == undefined) {
                            dataVal += '<td>' + ' ' + '</td>';
                        } else {
                            dataVal += '<td>' + val.format + '</td>';
                        }

                        if (val.text == undefined) {
                            dataVal += '<td>' + ' ' + '</td>';
                        } else {
                            dataVal += '<td>' + val.text + '</td>';
                        }

                        dataVal += '<td>' + '<a href="" class="open-homeEvents btn btn-default btn-rounded mb-4"  data-id="ISBN-001122" data-toggle="modal" data-target="#modalContactForm">Modifica</a>' + '</td>';
                        dataVal += '<td>' + '<img  id="preview' + k + '" src="http://placehold.it/180" width="100px" height ="100px"></img>' + '</td>';

                        //dataVal += '<td>' + '<button class="cfmbtn btn btn-primary " id="confirma">Confirma</button>' + '</td>';
                        dataVal += '</tr>';
                        previewImage(val.userId, val.nome, val.produttore, '#preview' + k, val.categoria);
                    }
                });
                $('#wrapper').replaceWith(dataVal);
            });

        });
    }


    document.getElementById('ModScanId').addEventListener('click', ScanProdottoSingle);
    function ScanProdottoSingle(e) {
        e.preventDefault();
        var input = '#scanner_input2';
        fg = true;
        scan(input);
    }

    //On Load run this code
    $(function () {



        var input = '#scanner_input';
        fg = false;
        scan(input);

    });

    //Barcode reader function
    function scan(input) {

        // Create the QuaggaJS config object for the live stream
        var liveStreamConfig = {
            inputStream: {
                type: "LiveStream",
                constraints: {
                    width: { min: 640 },
                    height: { min: 480 },
                    aspectRatio: { min: 1, max: 100 },
                    facingMode: "environment" // or "user" for the front camera
                }
            },
            locator: {
                patchSize: "medium",
                halfSample: true
            },
            numOfWorkers: (navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4),
            decoder: {
                "readers": [
                    { "format": "ean_reader", "config": {} }
                ]
            },
            locate: true

        };
        // The fallback to the file API requires a different inputStream option. 
        // The rest is the same 
        var fileConfig = $.extend(
            {},
            liveStreamConfig,
            {
                inputStream: {
                    size: 800
                }
            }
        );
        // Start the live stream scanner when the modal opens
        $('#livestream_scanner').on('shown.bs.modal', function (e) {

            Quagga.init(
                liveStreamConfig,
                function (err) {
                    if (err) {
                        $('#livestream_scanner .modal-body .error').html('<div class="alert alert-danger"><strong><i class="fa fa-exclamation-triangle"></i> ' + err.name + '</strong>: ' + err.message + '</div>');
                        Quagga.stop();
                        return;
                    }
                    Quagga.start();
                }
            );
        });


        // Make sure, QuaggaJS draws frames an lines around possible 
        // barcodes on the live stream
        Quagga.onProcessed(function (result) {
            var drawingCtx = Quagga.canvas.ctx.overlay,
                drawingCanvas = Quagga.canvas.dom.overlay;

            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                    result.boxes.filter(function (box) {
                        return box !== result.box;
                    }).forEach(function (box) {
                        Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
                    });
                }

                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
                }

                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
                }
            }
        });

        // Once a barcode had been read successfully, stop quagga and 
        // close the modal after a second to let the user notice where 
        // the barcode had actually been found.
        Quagga.onDetected(function (result) {
            if (result.codeResult.code) {
                Quagga.stop();
                setTimeout(function () { $('#livestream_scanner').modal('hide'); }, 1000);

                if (input == '#scanner_input' && fg == false) {
                    $(input).val(result.codeResult.code);
                    searchBarCode(result.codeResult.code);
                } else if (input == '#scanner_input2' && fg == true) {
                    console.log("here" + input);
                    $(input).val(result.codeResult.code);
                    Verfiy(result.codeResult.code);
                }
            }
        });

        // Stop quagga in any case, when the modal is closed
        $('#livestream_scanner').on('hide.bs.modal', function () {
            if (Quagga) {
                Quagga.stop();
            }
        });

        // Call Quagga.decodeSingle() for every file selected in the 
        // file input
        $("#livestream_scanner input:file").on("change", function (e) {

            if (e.target.files && e.target.files.length) {
                try {
                    Quagga.decodeSingle($.extend({}, fileConfig, {
                        src: URL.createObjectURL(e.target.files[0])
                    }), function (result) {
                        console.log(result.codeResult.code);
                    });
                } catch (error) {
                    alert(error)
                }
            }
        });
        //});
    }

    //verify if the barcode exists break if not Update
    function Verfiy(code) {
        firebase.database().ref('standardizzazione/').orderByChild('nome').equalTo(prodottoLoad).once("value", function (snapshot2) {
            snapshot2.forEach(function (child2) {
                var idScan = child2.key;
                var prodottoScan = child2.val().nome;
                var produttoreScan = child2.val().produttore;
                var prodottoCode = child2.val().text;
                if (produttoreScan == produttoreLoad) {
                    console.log("prodtto:" + prodottoScan);
                    if (prodottoCode == undefined) {
                        //update
                        if (confirm('Vuoi aggiungere un nuovo codice a barre per questo prodotto?')) {
                            child2.ref.update({
                                text: code
                            });
                        } else {
                            $('#scanner_input2').val('');
                        }
                    } else {
                        if (prodottoCode != code) {
                            if (confirm('Vuoi cambiare il codice a barre esistente per questo prodotto?')) {
                                child2.ref.update({
                                    text: code
                                });
                            } else {
                                $('#scanner_input2').val(prodottoCode);
                            }
                        }
                    }
                }
            });
        });

    }

    function searchBarCode(code) {
        var content = '';
        var k = 0;
        content += '<table id="wrapper" class="table table-hover">';
        content += '<tr id="tr">';
        content += '<th>PRODOTTORE:</th>';
        content += '<th>PRODOTTO:</th>';
        content += '<th>REVISIONATO:</th>';
        content += '<th>CATEGORIA:</th>';
        content += '<th>SCADENZA SPECIFICA:</th>';
        content += '<th>TIPO CODICE A BARRE</th>';
        content += '<th>CODICE A BARRE</th>';
        content += '<th></th>';
        firebase.auth().onAuthStateChanged(function (user) {

            if (user) {

                var leadsRef = firebase.database().ref('standardizzazione').orderByChild('text').equalTo(code);
                leadsRef.on('value', function (snapshot) {
                    snapshot.forEach(element => {
                        k++;
                        var key = element.key;
                        var val = element.val();

                        content += '<tr>';
                        content += '<td class="idhide">' + key + '</td>';
                        content += '<td>' + val.produttore + '</td>';
                        content += '<td>' + val.nome + '</td>';
                        content += '<td>' + val.revisionato + '</td>';
                        content += '<td>' + val.categoria + '</td>';

                        if (val.scadenzaSpec == undefined) {
                            content += '<td>' + ' ' + '</td>';
                        } else {
                            content += '<td>' + val.scadenzaSpec + '</td>';
                        }

                        if (val.format == undefined) {
                            content += '<td>' + ' ' + '</td>';
                        } else {
                            content += '<td>' + val.format + '</td>';
                        }

                        if (val.text == undefined) {
                            content += '<td>' + ' ' + '</td>';
                        } else {
                            content += '<td>' + val.text + '</td>';
                        }
                        content += '<td>' + '<a href="" class="open-homeEvents btn btn-default btn-rounded mb-4"  data-id="ISBN-001122" data-toggle="modal" data-target="#modalContactForm">Modifica</a>' + '</td>';
                        content += '<td>' + '<img id="preview' + k + '" src="http://placehold.it/180" width="100px" height ="100px"></img>' + '</td>';
                        content += '</tr>';
                        previewImage(val.userId, val.nome, val.produttore, '#preview' + k, val.categoria);
                    });
                    $('#wrapper').replaceWith(content);
                });
            }
        });
    }


});