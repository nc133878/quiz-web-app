import React from 'react'
import { nanoid } from 'nanoid'

function Question(props) {

  const labelArray = props.allAnswers[props.index].map((answer ,index) => {
    let styles = {backgroundColor: 'none'}
    if (props.isSubmitted) {
      console.log("Q"+ index + ": " + props.selectedAnswer[props.questionID])
      console.log("C"+ index + ": " + props.correctAnswers[index])
      if (props.correctSelections.includes(answer) && props.selectedAnswer[props.questionID] === answer) {
        styles = {
          backgroundColor: '#94D7A2',
          border: 'none'
        }
      }else if (props.incorrectSelections.includes(answer) && props.selectedAnswer[props.questionID] === answer) {
        styles = { 
          backgroundColor: '#F8BCBC', 
          opacity: 0.5,
          border: 'none'
        }
      }
      }
    return(
      <div key={nanoid()} className='radio-buttons' >
        <input 
          type="radio"
          id={answer}
          name={props.questionID}
          value={answer}
          onChange={props.handleChange}
          checked={props.selectedAnswer[props.questionID] === answer}
        />
      <label style={ styles }>
            {answer}
        </label>
      </div>
      )
    })

  return (
        <div className='question-container'>
                <h3 key={nanoid()}>{props.decode(props.detail.question)}</h3>
                <form key={nanoid()} className='answer-container'>                    
                    {labelArray}
                </form>
                <hr />
        </div>
  )
}

export default Question