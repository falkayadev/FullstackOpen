/* eslint-disable react/prop-types */
import { useRef, useState } from 'react'
import { useField } from './hooks'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate,
} from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link to="/" style={padding}>
        anecdotes
      </Link>
      <Link to="/create" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
)

const Anecdote = ({ anecdoteById }) => {
  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdoteById(parseInt(match.params.id)) : null
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes}</p>
      <p>for more info see {anecdote.info}</p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{' '}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
)

const Notification = ({ notification }) => {
  if (notification === '') {
    return null
  }
  return <div>{notification}</div>
}

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    props.notify(`a new anecdote "${content.value}" created`)
    navigate('/')
  }

  const handleClearAll = (event) => {
    event.preventDefault()
    author.clear()
    content.clear()
    info.clear()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            type={content.type}
            name="content"
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input
            type={author.type}
            name="author"
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input
            type={info.type}
            name="info"
            value={info.value}
            onChange={info.onChange}
          />
        </div>
        <button>create</button>
        <button onClick={handleClearAll}>reset</button>
      </form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  const timeoutRef = useRef(null)
  const notify = (message) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setNotification(message)
    timeoutRef.current = setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <Notification notification={notification} />
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route
            path="/about"
            element={
              <About anecdotes={anecdotes} notification={notification} />
            }
          />
          <Route
            path="/create"
            element={<CreateNew addNew={addNew} notify={notify} />}
          />
          <Route
            path="/anecdotes/:id"
            element={<Anecdote anecdoteById={anecdoteById} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App