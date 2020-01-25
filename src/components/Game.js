import React, { Component } from "react";
import Question from "./Question";
import { loadQuestions } from "../utilities/questionsHelper";
export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: null,
      currentQuestion: null,
      loading: true
    };
  }

  async componentDidMount() {
    try {
      const questions = await loadQuestions();

      this.setState(
        {
          questions
        },
        () => {
          this.changeQuestion();
        }
      );
    } catch (err) {
      console.error(err);
    }
  }

  changeQuestion() {
    // get random index of question
    const randomQuestionIndex = Math.floor(
      Math.random() * this.state.questions.length
    );
    // set current question to the question at random index
    const currentQuestion = this.state.questions[randomQuestionIndex];
    // remove question from questions going forward
    const remainingQuestions = [...this.state.questions];
    remainingQuestions.splice(randomQuestionIndex, 1);
    // update the state to reflect changes
    this.setState({
      questions: remainingQuestions,
      currentQuestion,
      loading: false
    });
  }

  render() {
    const { currentQuestion, loading } = this.state;
    return (
      <>
        {loading && <div id="loader" />}
        {!loading && currentQuestion && <Question question={currentQuestion} />}
      </>
    );
  }
}
