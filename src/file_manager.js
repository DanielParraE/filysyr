const fs = require("fs")
const path = require("path")
const hf = require("hidefile")

const initial_path = 'C:\\'
let current_path_directory = ''

const start_search = () => {
    const fls = fs.readdirSync(initial_path)
    return { 
        "current_path": initial_path,
        "files_with_stats": initial_files_with_stats(fls)
    }
}

const path_search = (path_directory) => {
    if (typeof path_directory === 'undefined' || path_directory === initial_path) {
        return start_search()
    }
    current_path_directory = path_directory
    const fls = fs.readdirSync(current_path_directory.replaceAll('\\', '\\\\'))
    return { 
        "current_path": current_path_directory,
        "files_with_stats": current_path_files_with_stats(fls)
    }
}

const current_path_files_with_stats = (fls) => {
    let result = []
    for (const fl of fls) {
        try {
            file_stats = fs.statSync(`${current_path_directory}\\${fl}`)
            result.push({
                type: path.extname(`${current_path_directory}\\${fl}`),
                size: file_stats.size,
                isDirectory: file_stats.isDirectory(),
                full_path: `${current_path_directory}\\${fl}`,
                name: fl
            })
        } catch (error) {
            console.error(error)
            continue
        }
    }
    return result
}

const initial_files_with_stats = (fls) => {
    let result = []
    for (const fl of fls) {
        try {
            file_stats = fs.statSync(`${initial_path}${current_path_directory}${fl}`)
            result.push({
                type: path.extname(`${initial_path}${fl}`),
                size: file_stats.size,
                isDirectory: file_stats.isDirectory(),
                full_path: `${initial_path}${current_path_directory}${fl}`,
                name: fl
            })
        } catch (error) {
            continue
        }
    }
    return result
}

module.exports = { start_search, path_search }
