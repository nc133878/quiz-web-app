import React from 'react'
import { nanoid } from 'nanoid'

function Question(props) {

  const labelArray = props.allAnswers[props.index].map((answer, index) => {
    const inputId = `${props.questionID}-${index}`

    let styles = {}
    if (props.isSubmitted) {
      if (
        props.correctSelections.includes(answer) &&
        props.selectedAnswer[props.questionID] === answer
      ) {
        styles = { backgroundColor: '#94D7A2', border: 'none' }
      } else if (
        props.incorrectSelections.includes(answer) &&
        props.selectedAnswer[props.questionID] === answer
      ) {
        styles = { backgroundColor: '#F8BCBC', opacity: 0.5, border: 'none' }
      }
    }

    return (
      <div key={nanoid()} className="radio-buttons">
        <input
          type="radio"
          id={inputId}
          name={props.questionID}
          value={answer}
          onChange={props.handleChange}
          checked={props.selectedAnswer[props.questionID] === answer}
        />
        <label htmlFor={inputId} style={styles}>
          {answer}
        </label>
      </div>
    )
  })

  return (
    <div className="question-block">
      <h3>{props.decode(props.detail.question)}</h3>
      <form className="answer-container">
        {labelArray}
      </form>
      <hr />
    </div>
  )
}

export default Question