const fs = require("fs")
const path = require("path")
const os = require("os")

const initial_path = 'C:\\'

const start_search = async () => {
    const fls = await fs.promises.readdir(initial_path)
    return { 
        "current_path": initial_path,
        "files_with_stats": await initial_files_with_stats(fls)
    }
}

const path_search = async (path_directory) => {
    if (typeof path_directory === 'undefined' || path_directory === initial_path) {
        return start_search()
    }
    const fls = await fs.promises.readdir(path.normalize(path_directory))
    return { 
        "current_path": path_directory,
        "files_with_stats": await current_path_files_with_stats(fls, path_directory)
    }
}

const index_files = async (path_to_search) => {
    let path
    if (path_to_search) {
        path = path_to_search
    } else {
        path = os.homedir()
    }
    let data = ''
    let folder_content = await fs.promises.readdir(path)
    folder_content.forEach(async (fl) => {
        try {
            file_stats = await fs.promises.stat(`${path}\\${fl}`)
            if (file_stats.isDirectory()) {
                await index_files(`${path}\\${fl}`)
            }
            data += `${path}\\${fl}\n`
        } catch (error) {
            console.log(error)
        }
    })
    await fs.promises.appendFile(`${os.homedir()}\\filysyrdata.txt`, data)
}

const current_path_files_with_stats = async (fls, path_directory) => {
    let result = []
    for (const fl of fls) {
        try {
            file_stats = await fs.promises.stat(`${path_directory}\\${fl}`)
            result.push({
                type: path.extname(`${path_directory}\\${fl}`),
                size: file_stats.size,
                isDirectory: file_stats.isDirectory(),
                full_path: `${path_directory}\\${fl}`,
                name: fl
            })
        } catch (error) {
            continue
        }
    }
    return result
}

const initial_files_with_stats = async (fls) => {
    let result = []
    for (const fl of fls) {
        try {
            file_stats = await fs.promises.stat(`${initial_path}${fl}`)
            result.push({
                type: path.extname(`${initial_path}${fl}`),
                size: file_stats.size,
                isDirectory: file_stats.isDirectory(),
                full_path: `${initial_path}${fl}`,
                name: fl
            })
        } catch (error) {
            continue
        }
    }
    return result
}

module.exports = { start_search, path_search, index_files }
