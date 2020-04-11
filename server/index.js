if(typeof window === 'undefined') {
	global.window = {} 
}
const express = require('express')
const { renderToString } = require('react-dom/server')
const SSR = require("../dist/search-server")
const fs = require('fs')
const path = require('path')
const template = fs.readFileSync(path.join(__dirname,'../dist/search.html'),'utf-8')
// const data = require('lujing')
//doucument is not defined 
// console.log(SSR)
const server = (port) => {
	const app = express()
	app.use(express.static('dist'))
	app.get('/search',(req,res) => {
		// console.log(SSR)
		const html = renderMarkup(renderToString(SSR))
		// console.log(html)
		res.status(200).send(html)
	})
	app.listen(port, () => {
		console.log('server success!')
	})
}
server(process.env.PORT || 3000);
const renderMarkup = (str) => {
	// console.log(str)
	// console.log(1)
	const dataStr = JSON.stringify(data)
	return template.replace('<!--HTML_PLACEHOLDER-->',str)
	.replace('<!--INITIAL_DATA_PLACEHOLDER-->',`<script>window.__initial_data=${dataStr}</script>`);
}