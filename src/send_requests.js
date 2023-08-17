const ipcRenderer = require("electron").ipcRenderer
let section_folder_elements = document.getElementById("section_folder_elements")
let folder_name = document.getElementById("folder_name")
let previous_directory_button = document.getElementById("previous_directory_button")
let search_file_button = document.getElementById("search_file_button")

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

const previous_directory = async () => {
    if (folder_name.innerHTML === 'C:\\' || folder_name.innerHTML === 'C:') {
        return
    }
    let folders = folder_name.innerHTML.split('\\')
    folders.pop()
    const result = folders.join('\\')
    if (result === 'C:' || result === 'C:\\') {
        await get_main_files()
        return
    }
    await change_directory(result)
}

const search_files = async (file_name) => {
    
}

const show_files = (fls) => {
    section_folder_elements.innerHTML = `<section class="content-element file"><div>Name</div><div>Size</div><div>File Type</div></section>`
    fls.forEach(fl => {
        section_folder_elements.innerHTML += fl
    });
}

window.onload = async () => {
    await get_main_files()
    previous_directory_button.onclick = previous_directory
    search_file_button.onclick = () => {
        search_files(document.getElementById("search_textbox").value)
    }
}
