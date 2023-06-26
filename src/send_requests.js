const { ipcRenderer } = require("electron")
let list_folder_contents = document.getElementById("list_folder_elements")

const get_main_files = async () => {
    let res = ipcRenderer.on('get-files-request', show_files)
    console.log(res)
}

const show_files = (evt, fls) => {
    list_folder_contents.appendChild(fls)
}

window.onload = get_main_files
