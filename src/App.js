import { useReducer } from "react";
import { useEffect } from "react";
import Header from "./Header";
import Loder from "./Loder";
import Main from "./Main";
import Question from "./Question";
import Errors from "./Errors";
import StartHere from "./StartHere";
import NextQuestion from "./components/NextQuestion";
import ProgressBar from "./components/ProgressBar";
import Finished from "./components/Finished";
import StartTimer from "./StartTimer";
import Footer from "./Footer";

const sec_per_question = 30;
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataError":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * sec_per_question,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index++,
        answer: null,
      };
    case "finished":
      const highscores =
        state.points > state.highscore ? state.points : state.highscore;
      return { ...state, status: "finished", highscore: highscores };
    case "reset":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action Unknown");
  }
}
function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestion = questions.length;
  const maxpoints = questions.reduce((prev, next) => next.points + prev, 0);

  useEffect(function () {
    async function getdata() {
      try {
        const result = await fetch("/Questions.json");
        console.log(result, "hj");
        if (!result.ok) {
          throw new Error("HTTP error");
        }
        const data = await result.json();
        console.log(data.questions, "array");
        const questions = data.questions;
        // console.log(data);
        dispatch({ type: "dataReceived", payload: questions });
      } catch (err) {
        dispatch({ type: "dataError" });
      }
    }
    getdata();
  }, []);

  return (
    <div className="App">
      <Header></Header>
      <Main>
        {status === "loading" && <Loder></Loder>}
        {status === "error" && <Errors></Errors>}
        {status === "ready" && (
          <StartHere length={numQuestion} dispatch={dispatch}></StartHere>
        )}
        {status === "active" && (
          <div>
            <ProgressBar
              index={index}
              totalquest={numQuestion}
              points={questions[index].points}
              maxpoints={maxpoints}
              answer={answer}
            ></ProgressBar>
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestion={numQuestion}
              ></NextQuestion>
              <StartTimer
                dispatch={dispatch}
                seconds={secondsRemaining}
              ></StartTimer>
            </Footer>
          </div>
        )}
        {status === "finished" && (
          <Finished
            points={points}
            totalPoints={maxpoints}
            highscore={highscore}
            dispatch={dispatch}
          ></Finished>
        )}
      </Main>
    </div>
  );
}

export default App;
