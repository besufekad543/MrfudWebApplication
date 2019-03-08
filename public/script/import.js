$(document).ready(function () {
    var database = firebase.database();
    document.getElementById('importfile').addEventListener('submit', importFile);

    function importFile(e) {
        e.preventDefault();
        var fileUpload = document.getElementById("fileName");
        importCSV(fileUpload);
    }

    function importCSV(fileUpload) {
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    console.log("Raw File");
                    console.log(e.target.result);
                    var lines=e.target.result.split('\r');
                    for(let i = 0; i<lines.length; i++){
                        lines[i] = lines[i].replace(/\s/,'')//remove the all spaces
                    }
                    var result = [];
                    var headers=lines[0].split(",");
                    for(var i=1;i<lines.length-1;i++){
                        var obj = {};
                        var currentline = lines[i].split(",");
                        for(var j=0;j<headers.length;j++){
                            if(currentline[j]==undefined){
                                obj[headers[j]] = '';
                            }else{
                                obj[headers[j]] = currentline[j];
                            }
                        }
                        database.ref('/stand').push(obj); 
                        result.push(obj);
                    }
                    alert('L\'importazione è stata completata correttamente');
                    document.getElementById("fileName").value ='';
                    //return result; //JavaScript object
                    /*console.log("After JSON Conversion");
                    console.log(JSON.stringify(result));
                    return JSON.stringify(result); //JSON
                    */
                }
                reader.readAsText(fileUpload.files[0]);
            } else {
                alert("Questo browser non supporta HTML5.");
            }
        } else {
            alert("Si prega di caricare un file CSV valido.");
        }
    }
});