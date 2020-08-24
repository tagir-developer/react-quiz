import React, { Component } from 'react'
import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
import { createControl } from '../../form/formFramework'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'

function createOptionControl(number) {
	return createControl({
		label: `Вариант ${number}`,
		id: number,
		errorMessage: 'Значение не может быть пустым'
	}, { required: true })
}

function createFormControls() {
	return {
		question: createControl({
			label: 'Введите вопрос',
			errorMessage: 'Вопрос не может быть пустым'
		}, { required: true }),
		option1: createOptionControl(1),
		option2: createOptionControl(2),
		option3: createOptionControl(3),
		option4: createOptionControl(4),
	}
}

export default class QuizCreator extends Component {

	state = {
		quiz: [],
		rightAnswerId: 1,
		formControls: createFormControls()
	}

	submitHandler = (event) => {
		event.preventDefaut()
	}

	addQuestionHandler = () => {

	}

	createQuizHandler = () => {

	}

	changeHandler = (value, controlName) => {

	}

	selectChangeHandler = event => {
		this.setState({
			rightAnswerId: +event.target.value
		})
	}

	renderControls() {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const control = this.state.formControls[controlName]

			return (
				<React.Fragment key={index}>
					<Input
						label={control.label}
						value={control.value}
						valid={control.valid}
						shouldValidate={!!control.validation}
						touched={control.touched}
						onChange={event => this.changeHandler(event.target.value, controlName)}
					/>

					{index === 0 ? <hr/> : null}
				</React.Fragment>
			)
		})
	}

	render() {
		const select = <Select 
			label="Выберите правильный ответ"
			value={this.state.rightAnswerId}
			onChange={this.selectChangeHandler}
			options={[
				{text: 1, value: 1},
				{text: 2, value: 2},
				{text: 3, value: 3},
				{text: 4, value: 4}
			]}
		/>

		return (
			<div className={classes.QuizCreator}>
				<div>
					<h1>Создать тест</h1>

					<form onSubmit={this.submitHandler}>

						{this.renderControls()}

						{select}

						<Button
							type="primary"
							onClick={this.addQuestionHandler}
						>
							Добавить вопрос
						</Button>
						<Button
							type="success"
							onClick={this.createQuizHandler}
						>
							Создать тест
						</Button>
					</form>
				</div>
			</div>
		)
	}
}