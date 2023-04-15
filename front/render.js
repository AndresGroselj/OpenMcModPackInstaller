const input_path = document.querySelector("#pathSelector input");
const btn_install = document.getElementById("btn-install");
const btn_buscar = document.getElementById("btn-searchDir");
const dd_packList = document.getElementById("dd-packList");
const loading = document.getElementById("loading");
btn_install.addEventListener("click", install)
btn_buscar.addEventListener("click", searchDir)

function install(){
    console.log("installing ... ")
    window.api.install(input_path.value, dd_packList.value)
}

async function searchDir(){
    console.log("buscando")
    result = await window.api.searchDir(input_path.value)
    canceled = result[0]
    path = result[1]
    if (!canceled){
        input_path.value = path
    }
}

async function getPackList(){
    displayLoading(true);
    var files = await window.api.getPackList();
    files.forEach(file => {
        console.log(file)
        if (file.mimeType == "application/zip"){
            let name = file.name.replace(".zip", "");
            dd_packList.innerHTML += `<option value="${file.id}">${name}</option>`;
        }
    });
    displayLoading(false);
}

function displayLoading(display){
    if (display){
        loading.classList.remove("d-none");
    } else {
        loading.classList.add("d-none");
    }
}

getPackList();