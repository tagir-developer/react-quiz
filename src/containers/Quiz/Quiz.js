import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import { fetchQuizById, quizAnswerClick } from '../../store/actions/quiz'

class Quiz extends Component {



    onAnswerClickHandler = (answerId) => {
        
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            isFinished: false,
            results: {},
            activeQuestion: 0,
            answerState: null,
        })
    }

    componentDidMount() {


        this.props.fetchQuizById(this.props.match.params.id)

        // console.log('Quiz ID = ', this.props.match.params.id)
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        this.props.loading || !this.props.quiz
                            ? <Loader />
                            : this.props.isFinished ?
                                <FinishedQuiz
                                    results={this.props.results}
                                    quiz={this.props.quiz}
                                    onRetry={this.retryHandler}
                                /> :
                                <ActiveQuiz
                                    answers={this.props.quiz[this.props.activeQuestion].answers}
                                    question={this.props.quiz[this.props.activeQuestion].question}
                                    onAnswerClick={this.onAnswerClickHandler}
                                    quizLength={this.props.quiz.length}
                                    answerNumber={this.props.activeQuestion + 1}
                                    state={this.props.answerState}
                                />
                    }


                </div>
            </div>
        )
    }
}

function mapStateToPops(state) {
    return {
        isFinished: state.quiz.isFinished,
        results: state.quiz.results,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState, 
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId))
    }
}



export default connect(mapStateToPops, mapDispatchToProps)(Quiz)