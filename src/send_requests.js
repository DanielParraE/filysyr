const ipcRenderer = require("electron").ipcRenderer
let section_folder_elements = document.getElementById("section_folder_elements")
let folder_name = document.getElementById("folder_name")

const get_main_files = async () => {
    const res = await ipcRenderer.invoke('get-files-request')
    folder_name.innerHTML = res.current_path
    show_files(res.formatted_elements)
}

const change_directory = async (desired_path) => {
    const res = await ipcRenderer.invoke('get-files-from-desired-path', desired_path)
    folder_name.innerHTML = res.current_path
    show_files(res.formatted_elements)
}

const show_files = (fls) => {
    section_folder_elements.innerHTML = ''
    fls.forEach(fl => {
        section_folder_elements.innerHTML += fl
    });
}

window.onload = get_main_files
