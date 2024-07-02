import './App.css';
import React from 'react';
import StartPage from './components/StartPage';
import Blob from './components/Blob'
import Answers from './components/Answers.js';
//import data from './data.js'

function App() {

  const[gameStart, setGameStart] = React.useState(false)

  function startQuiz(){
    setGameStart(!gameStart)
  }

  return (
    <main className="App">
        {gameStart ? 
        <Answers
            startQuiz={startQuiz}
          /> : 
        <StartPage />}
        {!gameStart && <button onClick={startQuiz}> Start Quiz</button>}
        <Blob class={"blob top"}/>
        <Blob class={"blob bottom"}/>
    </main>
  );
}

export default App;


/*= questionDetails.map( detail => {
    const answers = []
    detail.incorrect_answers.forEach( answer => answers.push(answer))
    answers.push(detail.correct_answer)
    
    return shuffle(answers)
  })*/


   //const responseCode = quizObject.response_code

     /*const url = "https://opentdb.com/api.php?amount=5"
  const [quizObject, setQuizObject] = React.useState()
  const [questionDetails, setQuestionDetails] = React.useState([]) //= quizObject.results
  const [allAnswers, setAllAnswers] = React.useState([])  


  React.useEffect(() => {
    fetch(url)
      .then(res => {
        if(res.ok){
          return res.json()
        }
        })
      .then(data => {
        setQuizObject(data)
        setQuestionDetails(data.results)
        setAllAnswers( data.results.map(detail => {          
          const answers = []
          detail.incorrect_answers.forEach( answer => answers.push(answer))
          answers.push(detail.correct_answer)
    
          return shuffle(answers)
        })
        )
      })
    }, [])


  function shuffle(array) {
    let shuffledArray = array
    let currentIndex = shuffledArray.length;
  
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex], shuffledArray[currentIndex]];
    }

    return shuffledArray
  }*/