'use strict'
 import React from 'react'
 import ReactDOM from 'react-dom'
 import '../../common'
 import './search.less'
 import logo from './image/logo-dark.png'
 import { a } from './tree-shaking'
 class Search extends React.Component {
	 constructor() {
	     super(...arguments);
			 this.state = {
				 Text: null
			 }
	 }
	 loadComponent() {
		 import('./text.js').then((Text) => {//返回的是promise对象
			 this.setState({
				 Text: Text.default
			 })
		 })
	 }
	 render () {
		 return <div className="search-text"> {a()}searcdsdsdddsdsdh<img src={logo} onClick={this.loadComponent.bind(this)}/></div>
	 }
	 
 }
 ReactDOM.render(
   <Search />,
	 document.getElementById('root')
 )