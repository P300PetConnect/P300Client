// uncss.js
const uncss = require("uncss")
const htmlFiles = ["./index.html"]
const opts = {
    csspath: "styles/",
    stylesheets: ["themes.css"]
}
uncss(htmlFiles, opts, (err, res) => {
    if(err)
        console.error(err)
    console.log(res)
})