var k = 0;
var userId;
$(document).ready(function () {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var content = '';
            var flg = [];
            var fname = [];
            userId = user.uid;

            firebase.database().ref('users/' + userId).on('value', function (snapVersion) {
                if (snapVersion.val().version == 1) {
                    firebase.database().ref('users/' + userId + '/rintracciabilita').on('value', function (snapshot) {
                        snapshot.forEach(produttore => {
                            firebase.database().ref('users/' + userId + '/rintracciabilita/' + produttore.key).on('value', function (snshot) {
                                snshot.forEach(prodotto => {
                                    k++;
                                    content += '<tr>';
                                    content += '<td>' + produttore.key + '</td>';
                                    content += '<td>' + prodotto.key + '</td>';

                                    firebase.database().ref('users/' + userId + '/PDF' + '/rintracciabilita/' + produttore.key + '/' + prodotto.key).on('value', function (shot) {
                                        if (shot.val() != null) {
                                            flg[k] = shot.val().uploadFlag;
                                            fname[k] = shot.val().fileName;
                                        }
                                    });

                                    if (flg[k]) {
                                        content += '<td>' + '<progress id="uploader' + k + '" value="100" max="100">0%</progress>' + '</td>';
                                        content += '<td>' + '<input type="file" class="upbtn" id="fileButton' + k + '" value="upload" mutiple/></td>';
                                        content += '<td>' + '<a class="openpdf" id="open' + k + '" href="" target="_blank">' + fname[k] + '</a>' + '</td>';
                                        content += '<td>' + '<input id="remove" type="image" src="img/can.jpg" width="15px" height="15px"/>' + '</td>';
                                    } else {
                                        content += '<td>' + '<progress id="uploader' + k + '" value="0" max="100">0%</progress>' + '</td>';
                                        content += '<td>' + '<input type="file" class="upbtn" id="fileButton' + k + '" value="upload" mutiple/>' + '</td>';
                                    }
                                    content += '</tr>';
                                });
                            });
                        });
                        $('#wrapper').append(content);
                    });
                } else if (snapVersion.val().version == 2) {
                    firebase.database().ref('users/' + userId + '/rintracciabilita').on('value', function (snapshot) {
                        snapshot.forEach(produttore => {
                            firebase.database().ref('users/' + userId + '/rintracciabilita/' + produttore.key).on('value', function (snshot) {
                                snshot.forEach(prodotto => {
                                    k++;
                                    content += '<tr>';
                                    content += '<td>' + produttore.key + '</td>';
                                    content += '<td>' + prodotto.key + '</td>';
                                    firebase.database().ref('users/' + userId + '/PDF' + '/rintracciabilita/' + produttore.key + '/' + prodotto.key).on('value', function (shot) {
                                        if (shot.val() != null) {
                                            flg[k] = shot.val().uploadFlag;
                                            fname[k] = shot.val().fileName;
                                        }
                                    });

                                    if (flg[k]) {
                                        content += '<td>' + '<progress id="uploader' + k + '" value="100" max="100">0%</progress>' + '</td>';
                                        content += '<td>' + '<input type="file" class="upbtn" id="fileButton' + k + '" value="upload" mutiple/></td>';
                                        content += '<td>' + '<a class="openpdf" id="open' + k + '" href="" target="_blank">' + fname[k] + '</a>' + ' </td>';
                                        content += '<td>' + '<input id="remove" type="image" src="img/can.jpg" width="15px" height="15px"/>' + '</td>';
                                    } else {
                                        content += '<td>' + '<progress id="uploader' + k + '" value="0" max="100">0%</progress>' + '</td>';
                                        content += '<td>' + '<input type="file" class="upbtn" id="fileButton' + k + '" value="upload" mutiple/>' + '</td>';
                                    }
                                    content += '</tr>';
                                });
                            });
                        });
                    });

                    firebase.database().ref('users/' + userId + '/carnibovine').on('value', function (snapshot) {
                        snapshot.forEach(produttore => {
                            firebase.database().ref('users/' + userId + '/carnibovine/' + produttore.key).on('value', function (snshot) {
                                snshot.forEach(prodotto => {
                                    k++;
                                    content += '<tr>';
                                    content += '<td>' + produttore.key + '</td>';
                                    content += '<td>' + prodotto.key + '</td>';
                                    
                                    firebase.database().ref('users/' + userId + '/PDF' + '/carnibovine/' + produttore.key + '/' + prodotto.key).on('value', function (shot) {
                                        if (shot.val() != null) {
                                            flg[k] = shot.val().uploadFlag;
                                            fname[k] = shot.val().fileName;
                                        }
                                    });

                                    if (flg[k]) {
                                        content += '<td>' + '<progress id="uploader' + k + '" value="100" max="100">0%</progress>' + '</td>';
                                        content += '<td>' + '<input type="file" class="upbtn" id="fileButton' + k + '" value="upload" mutiple/></td>';
                                        content += '<td>' + '<a class="openpdf" id="open' + k + '" href="" target="_blank">' + fname[k] + '</a>' + '</td>';
                                        content += '<td>' + '<input id="remove" type="image" src="img/can.jpg" width="15px" height="15px"/>' + '</td>';
                                    } else {
                                        content += '<td>' + '<progress id="uploader' + k + '" value="0" max="100">0%</progress>' + '</td>';
                                        content += '<td>' + '<input type="file" class="upbtn" id="fileButton' + k + '" value="upload" mutiple/>' + '</td>';
                                    }
                                    content += '</tr>';
                                });
                            });
                        });
                        $('#wrapper').append(content);
                    });
                }
            });
        }
    });


    $(document).on("click", ".openpdf", function () {

        var tbl = document.getElementById("wrapper");
        var rowIndex = $(this).closest('tr').index();
        var f0 = tbl.rows[rowIndex].cells[0].innerHTML;
        var f1 = tbl.rows[rowIndex].cells[1].innerHTML;

        firebase.database().ref('users/' + userId).on('value', function (snapVersion) {
            if (snapVersion.val().version == 1) {

                firebase.database().ref('users/' + userId + '/PDF' + '/rintracciabilita/' + f0 + '/' + f1).on('value', function (shot) {
                    if (shot.val() != null) {
                        var a = document.getElementById("open" + rowIndex);
                        a.href = shot.val().url;
                    }
                });

            } else if (snapVersion.val().version == 2) {

                firebase.database().ref('users/' + userId + '/PDF' + '/rintracciabilita/' + f0 + '/' + f1).on('value', function (shot) {
                    if (shot.val() != null) {
                        var a = document.getElementById("open" + rowIndex);
                        a.href = shot.val().url;
                        
                    }
                });

                firebase.database().ref('users/' + userId + '/PDF' + '/carnibovine/' + f0 + '/' + f1).on('value', function (shot) {
                    if (shot.val() != null) {
                        var a = document.getElementById("open" + rowIndex);
                        a.href = shot.val().url;
                    }
                });
            }
        });

    });

    $(document).on("click", "#remove", function () {
        var tbl = document.getElementById("wrapper");
        var rowIndex = $(this).closest('tr').index();
        var f01 = tbl.rows[rowIndex].cells[0].innerHTML; //produttore
        var f11 = tbl.rows[rowIndex].cells[1].innerHTML; //prodotto
        var f21 = tbl.rows[rowIndex].cells[4].innerHTML; //name
        /*alert("Deleting:"+userId+'/PDF'+'/rintracciabilita/'+f01+"/"+f11+"/"+f21);
        firebase.storage().ref().child(userId+'/PDF'+'/rintracciabilita/'+f01+'/'+f11+'/'+f21).delete().then(function(success) {
            console.log(success.message);
        }).catch(function(error) {
            console.log(error.message);
        });*/
        if (confirm('Sei sicuro di voler rimuovere questo file?')) {
            firebase.database().ref('users/' + userId).on('value', function (snapVersion) {
                if (snapVersion.val().version == 1) {
                    firebase.database().ref('users/' + userId + '/PDF' + '/rintracciabilita/' + f01 + '/' + f11).remove();
                } else if (snapVersion.val().version == 2) {
                    firebase.database().ref('users/' + userId + '/PDF' + '/rintracciabilita/' + f01 + '/' + f11).remove();
                    firebase.database().ref('users/' + userId + '/PDF' + '/carnibovine/' + f01 + '/' + f11).remove();
                }
            });
        }
    });


    $(document).on("click", ".upbtn", function () {
        var tbl = document.getElementById("wrapper");
        var rowIndex = $(this).closest('tr').index();
        var f0 = tbl.rows[rowIndex].cells[0].innerHTML;
        var f1 = tbl.rows[rowIndex].cells[1].innerHTML;

        //var rString = randomString(4, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        //var fileNameUnique = userId.concat('_').concat(f0).concat('_').concat(f1).concat('_').concat(rowIndex);
        //alert(fileNameUnique);

        var resFile = "fileButton".concat(rowIndex).trim();
        var resUpl = "uploader".concat(rowIndex).trim();
        var uploader = document.getElementById(resUpl);

        document.getElementById(resFile).addEventListener('change', UploadPdf);
        function UploadPdf(e) {
            e.preventDefault();
            if (confirm('Vuoi veramente caricare il pdf selezionato?')) {
                var file = e.target.files[0];
                var fileExt = file.name.split('.')[1];
                //limit file extension
                if ((fileExt == "pdf") || (fileExt == "txt")) {
                    //limit size to 10MB
                    if (file.size <= 10000000) {
                        uploadFileAsPromise(file);
                    } else {
                        alert("Maximum upload size (10MB) exceeded !!!");
                        document.getElementById(resFile).value = '';
                    }
                } else {
                    alert("Sono ammessi solo file .pdf o .txt !!!");
                    document.getElementById(resFile).value = '';
                }
            } else {
                window.location.reload();
            }
        }

        //Handle waiting to upload each file using promise
        function uploadFileAsPromise(pdfFile) {

            return new Promise(function (resolve, reject) {
                firebase.database().ref('users/' + userId).on('value', function (snapVersion) {
                    if (snapVersion.val().version == 1) {

                        var storageRef = firebase.storage().ref(userId + '/PDF' + '/rintracciabilita/' + f0 + "/" + f1 + "/" + pdfFile.name);
                        //Upload file
                        var task = storageRef.put(pdfFile);
                        //Update progress bar
                        task.on('state_changed', function progress(snapshot) {
                            var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                            uploader.value = percentage;
                        },
                            function error(err) {
                                alert("Error:" + err.message);
                            },
                            function complete() {
                                //var downloadURL = task.snapshot.downloadURL;
                                task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                                    //alert("downloadURL:"+downloadURL);
                                    firebase.database().ref('users/' + userId + '/PDF' + '/rintracciabilita/' + f0 + '/' + f1).set({
                                        fileName: pdfFile.name,
                                        uploadFlag: true,
                                        url: downloadURL
                                    });
                                });
                                alert("Caricato con successo!");
                                setTimeout(function () {
                                    window.location.reload();
                                }, 500);
                            });

                    } else if (snapVersion.val().version == 2) {
                        var ck = 0;
                        //search if prodotto and produttoree exists in rintracciabilita
                        firebase.database().ref('users/' + userId + '/rintracciabilita/' + f0 + '/' + f1).on('value', function (shot) {
                            shot.forEach(prodotto => {
                                ck++;
                            });
                        });

                        // alert("Count:"+ck);
                        if (ck > 0) {
                            var storageRef = firebase.storage().ref(userId + '/PDF' + '/rintracciabilita/' + f0 + "/" + f1 + "/" + pdfFile.name);
                            //Upload file
                            var task = storageRef.put(pdfFile);
                            //Update progress bar
                            task.on('state_changed', function progress(snapshot) {
                                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                                uploader.value = percentage;
                            },
                                function error(err) {
                                    alert("Error:" + err.message);
                                },
                                function complete() {
                                    //var downloadURL = task.snapshot.downloadURL;
                                    //alert(downloadURL);
                                    task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                                        //console.log('File available at', downloadURL);
                                        //alert("downloadURL:"+downloadURL);
                                        firebase.database().ref('users/' + userId + '/PDF' + '/rintracciabilita/' + f0 + '/' + f1).set({
                                            fileName: pdfFile.name,
                                            uploadFlag: true,
                                            url: downloadURL
                                        });
                                    });
                                    alert("Caricato con successo!");
                                    setTimeout(function () {
                                        window.location.reload();
                                    }, 500);
                                });

                        } else {
                            var storageRef = firebase.storage().ref(userId + '/PDF' + '/carnibovine/' + f0 + "/" + f1 + "/" + pdfFile.name);
                            //Upload file
                            var task = storageRef.put(pdfFile);
                            //Update progress bar
                            task.on('state_changed', function progress(snapshot) {
                                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                                uploader.value = percentage;
                            },
                                function error(err) {
                                    alert("Error:" + err.message);
                                },
                                function complete() {
                                    //var downloadURL = task.snapshot.downloadURL;
                                    task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                                        //alert("downloadURL:"+downloadURL);

                                        firebase.database().ref('users/' + userId + '/PDF' + '/carnibovine/' + f0 + '/' + f1).set({
                                            fileName: pdfFile.name,
                                            uploadFlag: true,
                                            url: downloadURL
                                        });

                                    });
                                    alert("Caricato con successo!");
                                    setTimeout(function () {
                                        window.location.reload();
                                    }, 500);
                                });
                        }
                        ck = 0;
                    }
                });
            });
        }

        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        }
    });

    //document.getElementById("ximg").innerHTML = '<img src="img\can.jpg"/>';
    //Live Search on page Load
    liveSearch();
    //AJAX
    function liveSearch() {
        var flg3 = [];
        var fname3 = [];

        $.ajaxSetup({ cache: false });
        $('#prodotto').keyup(function () {
            $('#wrapper').html('');
            $('#state').val('');
            var searchField = $('#prodotto').val();
            var expression = new RegExp(searchField, "i");

            var dataVal = '';
            var z = 0;
            dataVal += '<table id="wrapper" class="table table-hover">';
            dataVal += '<tr id="tr">';
            dataVal += '<th>PRODOTTORE:</th>';
            dataVal += '<th>PRODOTTO:</th>';
            dataVal += '<th>PROGRESSO</th>';
            dataVal += '<th>SFOGLIA IL FILE DESIDERATO</th>';
            dataVal += '<th>PDF CARICATO</th>';
            dataVal += '<th>RIMUOVI IL FILE CARICATO</th>';

            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    firebase.database().ref('users/' + userId).on('value', function (snapVersion) {
                        if (snapVersion.val().version == 1) {
                            firebase.database().ref('users/' + user.uid + '/rintracciabilita').on('value', function (snapshot) {
                                snapshot.forEach(produttore => {
                                    firebase.database().ref('users/' + user.uid + '/rintracciabilita/' + produttore.key).on('value', function (snshot) {
                                        snshot.forEach(prodotto => {
                                            z++;
                                            if (prodotto.key.search(expression) != -1 || produttore.key.search(expression) != -1) {
                                                dataVal += '<tr>';
                                                dataVal += '<td>' + produttore.key + '</td>';
                                                dataVal += '<td>' + prodotto.key + '</td>';
                                                firebase.database().ref('users/' + user.uid + '/PDF' + '/rintracciabilita/' + produttore.key + '/' + prodotto.key).on('value', function (shot) {
                                                    if (shot.val() != null) {
                                                        flg3[z] = shot.val().uploadFlag;
                                                        fname3[z] = shot.val().fileName;
                                                    }
                                                });
                                                if (flg3[z]) {
                                                    dataVal += '<td>' + '<progress id="uploader' + z + '" value="100" max="100">0%</progress>' + '</td>';
                                                    dataVal += '<td>' + '<input type="file" class="upbtn" id="fileButton' + z + '" value="upload" />' + '</td>';
                                                    dataVal += '<td>' + '<a class="openpdf" id="open' + z + '" href="" target="_blank">' + fname3[z] + '</a>' + '</td>';
                                                    dataVal += '<td>' + '<input id="remove" type="image" src="img/can.jpg" width="15px" height="15px"/>' + '</td>';
                                                } else {
                                                    dataVal += '<td>' + '<progress id="uploader' + z + '" value="0" max="100">0%</progress>' + '</td>';
                                                    dataVal += '<td>' + '<input type="file" class="upbtn" id="fileButton' + z + '" value="upload"/>' + '</td>';
                                                }
                                                dataVal += '</tr>';
                                            }
                                        });
                                    });
                                });
                                $('#wrapper').replaceWith(dataVal);
                            });
                        } else if (snapVersion.val().version == 2) {
                            firebase.database().ref('users/' + user.uid + '/rintracciabilita').on('value', function (snapshot) {
                                snapshot.forEach(produttore => {
                                    firebase.database().ref('users/' + user.uid + '/rintracciabilita/' + produttore.key).on('value', function (snshot) {
                                        snshot.forEach(prodotto => {
                                            z++;
                                            if (prodotto.key.search(expression) != -1 || produttore.key.search(expression) != -1) {
                                                dataVal += '<tr>';
                                                dataVal += '<td>' + produttore.key + '</td>';
                                                dataVal += '<td>' + prodotto.key + '</td>';
                                                firebase.database().ref('users/' + user.uid + '/PDF' + '/rintracciabilita/' + produttore.key + '/' + prodotto.key).on('value', function (shot) {
                                                    if (shot.val() != null) {
                                                        flg3[z] = shot.val().uploadFlag;
                                                        fname3[z] = shot.val().fileName;
                                                    }
                                                });
                                                if (flg3[z]) {
                                                    dataVal += '<td>' + '<progress id="uploader' + z + '" value="100" max="100">0%</progress>' + '</td>';
                                                    dataVal += '<td>' + '<input type="file" class="upbtn" id="fileButton' + z + '" value="upload" />' + '</td>';
                                                    dataVal += '<td>' + '<a class="openpdf" id="open' + z + '" href="" target="_blank">' + fname3[z] + '</a>' + '</td>';
                                                    dataVal += '<td>' + '<input id="remove" type="image" src="img/can.jpg" width="15px" height="15px"/>' + '</td>';
                                                } else {
                                                    dataVal += '<td>' + '<progress id="uploader' + z + '" value="0" max="100">0%</progress>' + '</td>';
                                                    dataVal += '<td>' + '<input type="file" class="upbtn" id="fileButton' + z + '" value="upload"/>' + '</td>';
                                                }
                                                dataVal += '</tr>';
                                            }
                                        });
                                    });
                                });
                            });

                            firebase.database().ref('users/' + user.uid + '/carnibovine').on('value', function (snapshot) {
                                snapshot.forEach(produttore => {
                                    firebase.database().ref('users/' + user.uid + '/carnibovine/' + produttore.key).on('value', function (snshot) {
                                        snshot.forEach(prodotto => {
                                            z++;
                                            if (prodotto.key.search(expression) != -1 || produttore.key.search(expression) != -1) {
                                                dataVal += '<tr>';
                                                dataVal += '<td>' + produttore.key + '</td>';
                                                dataVal += '<td>' + prodotto.key + '</td>';
                                                firebase.database().ref('users/' + user.uid + '/PDF' + '/carnibovine/' + produttore.key + '/' + prodotto.key).on('value', function (shot) {
                                                    if (shot.val() != null) {
                                                        flg3[z] = shot.val().uploadFlag;
                                                        fname3[z] = shot.val().fileName;
                                                    }
                                                });
                                                if (flg3[z]) {
                                                    dataVal += '<td>' + '<progress id="uploader' + z + '" value="100" max="100">0%</progress>' + '</td>';
                                                    dataVal += '<td>' + '<input type="file" class="upbtn" id="fileButton' + z + '" value="upload" />' + '</td>';
                                                    dataVal += '<td>' + '<a class="openpdf" id="open' + z + '" href="" target="_blank">' + fname3[z] + '</a>' + '</td>';
                                                    dataVal += '<td>' + '<input id="remove" type="image" src="img/can.jpg" width="15px" height="15px"/>' + '</td>';
                                                } else {
                                                    dataVal += '<td>' + '<progress id="uploader' + z + '" value="0" max="100">0%</progress>' + '</td>';
                                                    dataVal += '<td>' + '<input type="file" class="upbtn" id="fileButton' + z + '" value="upload"/>' + '</td>';
                                                }
                                                dataVal += '</tr>';
                                            }
                                        });
                                    });
                                });
                                $('#wrapper').replaceWith(dataVal);
                            });
                        }
                    });

                }
            });
        });


        $('#prodottore').keyup(function () {
            $('#wrapper').html('');
            $('#state').val('');
            var searchField = $('#prodottore').val();
            var expression = new RegExp(searchField, "i");

            var dataVal = '';
            var z = 0;
            dataVal += '<table id="wrapper" class="table table-hover">';
            dataVal += '<tr id="tr">';
            dataVal += '<th>PRODOTTORE:</th>';
            dataVal += '<th>PRODOTTO:</th>';
            dataVal += '<th>PROGRESSO</th>';
            dataVal += '<th>SFOGLIA IL FILE DESIDERATO</th>';
            dataVal += '<th>PDF CARICATO</th>';
            dataVal += '<th>RIMUOVI IL FILE CARICATO</th>';

            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    firebase.database().ref('users/' + userId).on('value', function (snapVersion) {
                        if (snapVersion.val().version == 1) {
                            firebase.database().ref('users/' + user.uid + '/rintracciabilita').on('value', function (snapshot) {
                                snapshot.forEach(produttore => {
                                    firebase.database().ref('users/' + user.uid + '/rintracciabilita/' + produttore.key).on('value', function (snshot) {
                                        snshot.forEach(prodotto => {
                                            z++;
                                            if (produttore.key.search(expression) != -1) {
                                                dataVal += '<tr>';
                                                dataVal += '<td>' + produttore.key + '</td>';
                                                dataVal += '<td>' + prodotto.key + '</td>';
                                                firebase.database().ref('users/' + user.uid + '/PDF' + '/rintracciabilita/' + produttore.key + '/' + prodotto.key).on('value', function (shot) {
                                                    if (shot.val() != null) {
                                                        flg3[z] = shot.val().uploadFlag;
                                                        fname3[z] = shot.val().fileName;
                                                    }
                                                });

                                                if (flg3[z]) {
                                                    dataVal += '<td>' + '<progress id="uploader' + z + '" value="100" max="100">0%</progress>' + '</td>';
                                                    dataVal += '<td>' + '<input type="file" class="upbtn" id="fileButton' + z + '" value="upload" />' + '</td>';
                                                    dataVal += '<td>' + '<a class="openpdf" id="open' + z + '" href="" target="_blank">' + fname3[z] + '</a>' + '</td>';
                                                    dataVal += '<td>' + '<input id="remove" type="image" src="img/can.jpg" width="15px" height="15px"/>' + '</td>';
                                                } else {
                                                    dataVal += '<td>' + '<progress id="uploader' + z + '" value="0" max="100">0%</progress>' + '</td>';
                                                    dataVal += '<td>' + '<input type="file" class="upbtn" id="fileButton' + z + '" value="upload"/>' + '</td>';
                                                }
                                                dataVal += '</tr>';
                                            }
                                        });
                                    });
                                });
                                $('#wrapper').replaceWith(dataVal);
                            });
                        } else if (snapVersion.val().version == 2) {
                            firebase.database().ref('users/' + user.uid + '/rintracciabilita').on('value', function (snapshot) {
                                snapshot.forEach(produttore => {
                                    firebase.database().ref('users/' + user.uid + '/rintracciabilita/' + produttore.key).on('value', function (snshot) {
                                        snshot.forEach(prodotto => {
                                            z++;
                                            if (produttore.key.search(expression) != -1) {
                                                dataVal += '<tr>';
                                                dataVal += '<td>' + produttore.key + '</td>';
                                                dataVal += '<td>' + prodotto.key + '</td>';
                                                firebase.database().ref('users/' + user.uid + '/PDF' + '/rintracciabilita/' + produttore.key + '/' + prodotto.key).on('value', function (shot) {
                                                    if (shot.val() != null) {
                                                        flg3[z] = shot.val().uploadFlag;
                                                        fname3[z] = shot.val().fileName;
                                                    }
                                                });

                                                if (flg3[z]) {
                                                    dataVal += '<td>' + '<progress id="uploader' + z + '" value="100" max="100">0%</progress>' + '</td>';
                                                    dataVal += '<td>' + '<input type="file" class="upbtn" id="fileButton' + z + '" value="upload" />' + '</td>';
                                                    dataVal += '<td>' + '<a class="openpdf" id="open' + z + '" href="" target="_blank">' + fname3[z] + '</a>' + '</td>';
                                                    dataVal += '<td>' + '<input id="remove" type="image" src="img/can.jpg" width="15px" height="15px"/>' + '</td>';
                                                } else {
                                                    dataVal += '<td>' + '<progress id="uploader' + z + '" value="0" max="100">0%</progress>' + '</td>';
                                                    dataVal += '<td>' + '<input type="file" class="upbtn" id="fileButton' + z + '" value="upload"/>' + '</td>';
                                                }
                                                dataVal += '</tr>';
                                            }
                                        });
                                    });
                                });
                            });
                            firebase.database().ref('users/' + user.uid + '/carnibovine').on('value', function (snapshot) {
                                snapshot.forEach(produttore => {
                                    firebase.database().ref('users/' + user.uid + '/carnibovine/' + produttore.key).on('value', function (snshot) {
                                        snshot.forEach(prodotto => {
                                            z++;
                                            if (produttore.key.search(expression) != -1) {
                                                dataVal += '<tr>';
                                                dataVal += '<td>' + produttore.key + '</td>';
                                                dataVal += '<td>' + prodotto.key + '</td>';
                                                firebase.database().ref('users/' + user.uid + '/PDF' + '/carnibovine/' + produttore.key + '/' + prodotto.key).on('value', function (shot) {
                                                    if (shot.val() != null) {
                                                        flg3[z] = shot.val().uploadFlag;
                                                        fname3[z] = shot.val().fileName;
                                                    }
                                                });

                                                if (flg3[z]) {
                                                    dataVal += '<td>' + '<progress id="uploader' + z + '" value="100" max="100">0%</progress>' + '</td>';
                                                    dataVal += '<td>' + '<input type="file" class="upbtn" id="fileButton' + z + '" value="upload" />' + '</td>';
                                                    dataVal += '<td>' + '<a class="openpdf" id="open' + z + '" href="" target="_blank">' + fname3[z] + '</a>' + '</td>';
                                                    dataVal += '<td>' + '<input id="remove" type="image" src="img/can.jpg" width="15px" height="15px"/>' + '</td>';
                                                } else {
                                                    dataVal += '<td>' + '<progress id="uploader' + z + '" value="0" max="100">0%</progress>' + '</td>';
                                                    dataVal += '<td>' + '<input type="file" class="upbtn" id="fileButton' + z + '" value="upload"/>' + '</td>';
                                                }
                                                dataVal += '</tr>';
                                            }
                                        });
                                    });
                                });
                                $('#wrapper').replaceWith(dataVal);
                            });
                        }
                    });
                }
            });
        });
    }
});