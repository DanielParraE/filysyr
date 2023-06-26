const fm = ("./file_manager.js")

const show_folder_elements = () => {
    const fls = fm.start_search()
    let result = []
    fls.forEach((fl) => {
        result.push(folder_elements_tamplate({name: fl, size: "500kb", type: "txt file"}))
    })
    return result
}

const folder_elements_tamplate = ({name, size, type}) => {
    return `
    <li>
        <p>${name}      |${size}        |${type}</p>
    </li>\n
    `
}
