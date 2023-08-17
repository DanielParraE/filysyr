const fs = require("fs")
const path = require("path")
const os = require("os")

const initial_path = 'C:\\'

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
    const fls = fs.readdirSync(path.normalize(path_directory))
    return { 
        "current_path": path_directory,
        "files_with_stats": current_path_files_with_stats(fls, path_directory)
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
    fs.readdirSync(homedir).forEach((fl) => {
        try {
            file_stats = fs.statSync(`${path}\\${fl}`)
            if (file_stats.isDirectory()) {
                index_files(`${path}\\${fl}`)
            }
            data += `${path}\\${fl}\n`
        } catch (error) {}
    })
    fs.appendFileSync(`${os.homedir()}\\filysyrdata.txt`, data)
}

const current_path_files_with_stats = (fls, path_directory) => {
    let result = []
    for (const fl of fls) {
        try {
            file_stats = fs.statSync(`${path_directory}\\${fl}`)
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

const initial_files_with_stats = (fls) => {
    let result = []
    for (const fl of fls) {
        try {
            file_stats = fs.statSync(`${initial_path}${fl}`)
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
