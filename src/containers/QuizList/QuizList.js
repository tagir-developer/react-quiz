import React, { Component } from 'react';
import classes from './QuizList.module.css';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import { fetchQuizes } from '../../store/actions/quiz';
import { connect } from 'react-redux';

class QuizList extends Component {
  renderList() {
    return this.props.quizes.map(quiz => (
      <li key={quiz.id}>
        <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
      </li>
    ));
  }

  componentDidMount() {
    this.props.fetchQuizes();
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов (обновленный)</h1>

          {this.props.loading && this.props.quizes.length !== 0 ? (
            <Loader />
          ) : (
            <ul>{this.renderList()}</ul>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
