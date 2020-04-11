'use strict'
 // import React from 'react'
 // import ReactDOM from 'react-dom'
 // import '../../common'
 // import './search.less'
 // import logo from './image/logo-dark.png'
 // import { a } from './tree-shaking'
 const React = require('react')
 const logo = require('./image/logo-dark.png')
 // const { a } = require('./tree-shaking')
 // require('../../common')
 require('./search.less')
 class Search extends React.Component {
	 // constructor() {
	 //     super(...arguments);
		// 	 this.state = {
		// 		 Text: null
		// 	 }
	 // }
	 // loadComponent() {
		//  require('./text.js').then((Text) => {//返回的是promise对象
		// 	 this.setState({
		// 		 Text: Text.default
		// 	 })
		//  })
	 // }
	 render () {
		 return <div className="search-text">searcdsdsdddsdsdh<img src={logo}/></div>
	 }
	 
 }
 // ReactDOM.render( //服务端不能直接使用
 //   <Search />,
	//  document.getElementById('root')
 // )
 module.exports = <Search />