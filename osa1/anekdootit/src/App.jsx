import { useState } from 'react'

const Header = ({ text }) => (
  <>
    <h1>{text}</h1>
  </>
)

const Display = (props) => <>{props.value}</>

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(
    Array(anecdotes.length).fill(0)
  )

  console.log(votes)

  const anecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
    console.log("From anecdote(): ", selected, ". NOTE! Comes 1 re-render late.")
  }

  const addVote = () => {
    console.log("From addVote(): selected: ", selected)
    console.log("From addVote(): votes[selected]: ", votes[selected])

    const copy = [...votes]
    
    console.log("Votes before vote addition: ", copy[selected])

    copy[selected] += 1

    console.log("Votes after vote addition: ", copy[selected])

    setVotes(copy)
  }

  const highestVotes = () => {
    return Math.max.apply(Math, votes)
  }

  const findMostPopular = (array, highestNum) => {
    console.log("Highest array number:", highestNum)

    let indexOfMostVoted = array.indexOf(highestNum)

    console.log("Index of most voted:", indexOfMostVoted)
    console.log("Compare to given array:", array)
    console.log("Most voted object:", anecdotes[indexOfMostVoted])

    return anecdotes[indexOfMostVoted]
  }

  return (
    <div>
      <Header text="Anecdotes" />
      <p>"<Display value={anecdotes[selected]} />"</p>
      <p>Voted <Display value={votes[selected]} /> times.</p>
      <Button handleClick={addVote} text="Vote" />
      <Button handleClick={anecdote} text="Next anecdote" />

      <Header text="Anecdote with most votes" />
      <p><Display value={findMostPopular(votes, highestVotes())} /></p>
      <p>Anecdote above has <Display value={highestVotes()} /> votes.</p>
    </div>
  )
}

export default App