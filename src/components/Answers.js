import React from 'react'
import QuestionPage from './QuestionPage'
import {decode} from 'html-entities'

function Answers(props) {

    const url = "https://opentdb.com/api.php?amount=5"
    //const [quizObject, setQuizObject] = React.useState()
    const [questionDetails, setQuestionDetails] = React.useState([])
    const [allAnswers, setAllAnswers] = React.useState([])  
  
  
    React.useEffect(() => {
      fetch(url)
        .then(res => {
          if(res.ok){
            return res.json()
          }
          })
        .then(data => {
          //setQuizObject(data)
          setQuestionDetails(data.results)
          setAllAnswers( data.results.map(detail => {          
            const answers = []
            detail.incorrect_answers.forEach( answer => answers.push(decode(answer)))
            answers.push(decode(detail.correct_answer))
      
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
    }
    

    return (
         <QuestionPage
            questionDetails={questionDetails}
            allAnswers={allAnswers}
            startQuiz={props.startQuiz}
            decode={decode}
          />
    )
}

export default Answers