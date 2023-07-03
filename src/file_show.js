const { start_search, path_search } = require("./file_manager.js")

const show_folder_elements = (desired_path) => {
    let path_data
    if (typeof desired_path === 'undefined') {
        path_data = start_search()
    } else {
        path_data = path_search(desired_path)
    }
    let result = []
    const fls = path_data.files_with_stats
    fls.forEach((fl) => {
        result.push(folder_elements_tamplate(fl))
    })
    return { 
        "current_path": path_data.current_path,
        "formatted_elements": result
    }
}

const folder_elements_tamplate = (fl) => {
    if (fl.isDirectory) {
        return `<p><a href="#" onClick="change_directory('${fl.full_path.replaceAll('\\', '\\\\')}')">${fl.name}</a></p>`
    }
    return `<p>${fl.name}|${fl.isDirectory ? '' : fl.size}|${fl.type}</p>`
}

module.exports = { show_folder_elements }
