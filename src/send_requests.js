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

const show_files = (fls) => {
    section_folder_elements.innerHTML = ''
    section_folder_elements.innerHTML += `<section class="content-element file"><div>Name</div><div>Size</div><div>File Type</div></section>`
    fls.forEach(fl => {
        section_folder_elements.innerHTML += fl
    });
}

window.onload = get_main_files
