import React, { Component } from 'react'
import classes from './QuizList.module.css'
import {NavLink} from 'react-router-dom'

export default class QuizList extends Component {

	renderList() {
		return [1, 2, 3].map((quiz, index) => (
			<li
				key={index}
			>
				<NavLink to={'/quiz/' + quiz}>
					Test {quiz}
				</NavLink>
			</li>
		))
	}

	render() {
		return (
			<div className={classes.QuizList}>
				<div>
					<h1>Список тестов</h1>

					<ul>
						{this.renderList()}
					</ul>
				</div>
			</div>
		)
	}
}