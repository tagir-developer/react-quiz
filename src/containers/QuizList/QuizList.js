import React, { Component } from 'react'
import classes from './QuizList.module.css'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import axios from '../../axios/axios-quiz'

export default class QuizList extends Component {

	state = {
		quizes: [],
		isLoading: true
	}

	renderList() {
		return this.state.quizes.map(quiz => (
			<li
				key={quiz.id}
			>
				<NavLink to={'/quiz/' + quiz.id}>
					{quiz.name}
				</NavLink>
			</li>
		))
	}

	async componentDidMount() {
		try {
			const response = await axios.get('/quizes.json')
			console.log(response.data)

			const quizes = []

			Object.keys(response.data).forEach((key, index) => {
				quizes.push({
					id: key,
					name: `Тест №${index + 1}`
				})
			})

			this.setState({
				quizes, isLoading: false
			})

		} catch (e) {
			console.log(e)
		}

	}

	render() {
		return (
			<div className={classes.QuizList}>
				<div>
					<h1>Список тестов</h1>

					{
						this.state.isLoading
							? <Loader />
							: <ul>
								{this.renderList()}
							  </ul>
					}


				</div>
			</div>
		)
	}
}