const ipcRenderer = require("electron").ipcRenderer
let list_folder_contents = document.getElementById("list_folder_elements")

const get_main_files = async () => {
    const res = await ipcRenderer.invoke('get-files-request')
    show_files(res)
}

const show_files = (fls) => {
    list_folder_contents.innerHTML = ''
    fls.forEach(fl => {
        list_folder_contents.innerHTML += fl
    });
}

window.onload = get_main_files
