import { useState } from 'react'

const Header = ({ text }) => (
  <>
    <h1>{text}</h1>
  </>
)

const Display = (props) => <>{props.value}</>

const StatisticLine = (props) => {
  return (
    <>
      <tr>
        <th>{props.text}</th>
        <td><Display value={props.value} /></td>
      </tr>
    </>
  )
}

const Statistics = (props) => {
  const {text1, text2, text3, text4, text5} = props
  const {value1, value2, value3, value4, value5} = props

  console.log(text1, text2, text3, text4, text5)
  console.log(value1, value2, value3, value4, value5)
  console.log(!value1, !value2, !value3, !value4, !value5)

  if (!value1 && !value2 && !value3 && !value4 && !value5) return (
    <>
      <p>No feedback given</p>
    </>
  )
  return (
    <>
      <table>
        <tbody>
          <StatisticLine text={text1} value={value1} />
          <StatisticLine text={text2} value={value2} />
          <StatisticLine text={text3} value={value3} />
          <StatisticLine text={text4} value={value4} />
          <StatisticLine text={text5} value={value5} />
        </tbody>
      </table>
    </>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClickHandler = () => {
    setGood(good + 1)
    console.log("Good set to", good + 1, ".")
  }

  const neutralClickHandler = () => {
    setNeutral(neutral + 1)
    console.log("Neutral set to", neutral + 1, ".")
  }

  const badClickHandler = () => {
    setBad(bad + 1)
    console.log("Bad set to", bad + 1, ".")
  }

  const average = () => {
    // avoid division by zero
    if (!good && !neutral && !bad) return undefined

    // good, neutral or bad is > 0 so now division by zero happens
    return (good * 1 + neutral * 0 + bad * (-1)) / (good + neutral + bad)
  }

  const positive = () => {
    // avoid division by zero
    if (!good && !neutral && !bad) return undefined

    // good, neutral or bad is > 0 so now division by zero happens
    return 100 * good / (good + neutral + bad)
  }

  return (
    <div>
      <Header text="Give feedback" />
      <Button handleClick={goodClickHandler} text="Good" />
      <Button handleClick={neutralClickHandler} text="Neutral" />
      <Button handleClick={badClickHandler} text="Bad" />

      <Header text="Statistics" />
      <Statistics 
        text1="Good" value1={good}
        text2="Neutral" value2={neutral}
        text3="Bad" value3={bad}
        text4="Average" value4={average()}
        text5="Positive %" value5={positive()}
      />
    </div>
  )
}

export default App