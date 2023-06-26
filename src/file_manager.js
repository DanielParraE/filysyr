const fs = require("fs")

const initial_path = 'C:\\' 

const start_search = () => {
    return fs.readdirSync(initial_path)
}

module.exports = { start_search }
