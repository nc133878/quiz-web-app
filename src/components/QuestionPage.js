import React from 'react'
import { nanoid } from 'nanoid'
import { useCallback } from 'react'
import Question from './Questions'


function QuestionPage(props) {

  const [allAnswered, setAllAnswered] = React.useState(false)
  const [correctSelections, setCorrectSelections] = React.useState([])
  const [incorrectSelections, setIncorrectSelections] = React.useState([])
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [selectedAnswer, setSelectedAnwser] = React.useState({
    q0:'',
    q1:'',
    q2:'',
    q3:'',
    q4:'',
  })


  const checkAllAnswered = useCallback( () => {
    let allAnswered = true

    Object.values(selectedAnswer).forEach( answer => {
      if(!answer){
        allAnswered = false
      }
    })

    setAllAnswered(allAnswered)
  }, [selectedAnswer])

  React.useEffect(() => {
    checkAllAnswered()
  }, [selectedAnswer, checkAllAnswered])



    
  // array to hold correct answers
    const correctAnswers = props.questionDetails.map(detail => detail.correct_answer) 
    console.log(correctAnswers)

    const questionElements = props.questionDetails.map( (detail, index) => {
        const questionID=`q${index}`
        return (
            <Question
              key = {nanoid()}
              allAnswers={props.allAnswers} 
              detail={detail} 
              index={index}
              questionID={questionID}
              handleChange={handleChange}
              selectedAnswer={selectedAnswer}
              incorrectSelections={incorrectSelections}
              correctSelections={correctSelections}
              correctAnswers={correctAnswers}
              isSubmitted={isSubmitted}
              decode={props.decode}
              />
            )
    })

    
    function handleChange(event) {

      const {name, value} = event.target
      setSelectedAnwser(prevSelectedAnswer => {
          return ({
            ...prevSelectedAnswer, 
          [name]:value
          })
      })
    }

    

    function checkAnswers(){
      if(allAnswered){
        const selections = Object.values(selectedAnswer) 
        selections.forEach( (selection,index) => {
          if(!(correctAnswers[index] === selection)){
            setIncorrectSelections(prevIncorrectSelections => {
              const updatedArray = [...prevIncorrectSelections]
              updatedArray.push(selection)
              return(updatedArray)
            })  
          } else{
            setCorrectSelections(prevCorrectSelections => {
              const updatedArray = [...prevCorrectSelections]
              updatedArray.push(selection)
              return(updatedArray)
            //correctSelections.push(selection)
          })
        }
      })      
        setIsSubmitted(prevIsSubmitted => !prevIsSubmitted)
      }
    }


    return (
        <div key={nanoid()} className='question-container'>
            {questionElements}
            <div className='center'>
              {
                isSubmitted && 
                <>
                  <span>
                    {`You have scored ${correctSelections.length}/${correctAnswers.length} correct answers.`}
                  </span>
                  <br />
                  
                  {correctAnswers.map( (answer, index) => {
                    return <p>{`${index+1}: ${props.decode(answer)}`}</p>
                  })}
                  
                </>
              }
              <button onClick={!isSubmitted? checkAnswers : props.startQuiz} disabled={!allAnswered}>{!isSubmitted ? "Check Answers": "Play Again"}</button>
            </div>
        </div>
  )
}

export default QuestionPage