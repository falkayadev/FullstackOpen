/* eslint-disable react/prop-types */
import { useRef, useState } from 'react'
import { useField } from './hooks'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouterLink,
  useMatch,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import {
  Box,
  Button,
  Stack,
  Typography,
  TableContainer,
  TableBody,
  Table,
  TableRow,
  TableCell,
  Container,
  Link,
  Breadcrumbs,
  TextField,
} from '@mui/material'

const Header = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ mb: 6 }}
    >
      <Typography variant="h4" component="h1">
        AnecdotesApp
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button
          component={RouterLink}
          to="/"
          variant={useMatch('/') ? 'contained' : 'outlined'}
        >
          Home
        </Button>
        <Button
          component={RouterLink}
          to="/create"
          variant={useMatch('/create') ? 'contained' : 'outlined'}
        >
          Create new
        </Button>
        <Button
          component={RouterLink}
          to="/about"
          variant={useMatch('/about') ? 'contained' : 'outlined'}
        >
          About
        </Button>
      </Stack>
    </Stack>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <Box>
    <TableContainer>
      <Table>
        <TableBody>
          {anecdotes.map((anecdote) => (
            <TableRow key={anecdote.id}>
              <TableCell>
                <Link
                  component={RouterLink}
                  to={`/anecdotes/${anecdote.id}`}
                  underline="none"
                >
                  {anecdote.content}
                </Link>
              </TableCell>
              <TableCell>{anecdote.author}</TableCell>
              <TableCell>{anecdote.votes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
)

const DynamicBreadcrumbs = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)
  console.log(pathnames)

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        component={RouterLink}
        to="/"
        underline="none"
        color={location.pathname === '/' ? '#333' : '#999'}
        fontSize={'0.8rem'}
      >
        Home
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`
        const isLast = index === pathnames.length - 1
        const label =
          value === 'create'
            ? 'Create New'
            : value === 'about'
              ? 'About'
              : value === 'anecdotes'
                ? 'Anecdotes'
                : value

        return isLast ? (
          <Link
            key={to}
            component={RouterLink}
            to={to}
            underline="none"
            color={isLast ? '#333' : '#999'}
            fontSize={'0.8rem'}
          >
            {label}
          </Link>
        ) : (
          <Link
            key={to}
            component={RouterLink}
            to={to}
            underline="none"
            color={isLast ? '#333' : '#999'}
            fontSize={'0.8rem'}
          >
            {label}
          </Link>
        )
      })}
    </Breadcrumbs>
  )
}
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
  <Stack spacing={2}>
    <Typography variant="h5">About</Typography>
    <Typography variant="body1">According to Wikipedia:</Typography>

    <Box bgcolor={'#f5f5f5'} padding={5} borderRadius={1}>
      <Typography variant="body1" component="blockquote">
        &ldquo;An anecdote is a brief, revealing account of an individual person
        or an incident. Occasionally humorous, anecdotes differ from jokes
        because their primary purpose is not simply to provoke laughter but to
        reveal a truth more general than the brief tale itself, such as to
        characterize a person by delineating a specific quirk or trait, to
        communicate an abstract idea about a person, place, or thing through the
        concrete details of a short narrative. An anecdote is "a story with a
        point."&rdquo;
      </Typography>
    </Box>

    <Typography variant="body2">
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </Typography>
  </Stack>
)

const Footer = () => (
  <Stack
    bgcolor="primary.main"
    color={'#fff'}
    direction={'row'}
    justifyContent={'center'}
    alignItems={'center'}
    p={2}
  >
    Anecdote app for&nbsp;
    <Link color="#eaeaea" href="https://fullstackopen.com/">
      Full Stack Open
    </Link>
    . Click&nbsp;
    <Link
      color="#eaeaea"
      href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js"
    >
      this
    </Link>
    &nbsp;for source code!
  </Stack>
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
    <Box>
      <Typography variant="h5" mb={4}>
        Create a New Anecdote!
      </Typography>
      <Stack component="form" onSubmit={handleSubmit} spacing={2}>
        <Box>
          <TextField
            size="small"
            fullWidth
            label="content"
            type={content.type}
            name="content"
            value={content.value}
            onChange={content.onChange}
          />
        </Box>
        <Box>
          <TextField
            size="small"
            fullWidth
            type={author.type}
            label="author"
            name="author"
            value={author.value}
            onChange={author.onChange}
          />
        </Box>
        <Box>
          <TextField
            size="small"
            fullWidth
            type={info.type}
            label="url"
            name="info"
            value={info.value}
            onChange={info.onChange}
          />
        </Box>
        <Stack
          direction={'row'}
          width={'100%'}
          alignItems={'center'}
          justifyContent={'space-between'}
          spacing={6}
        >
          <Button variant="contained" fullWidth>
            create
          </Button>
          <Button variant="outlined" onClick={handleClearAll} fullWidth>
            reset
          </Button>
        </Stack>
      </Stack>
    </Box>
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
      <Stack minHeight="100vh">
        <Container maxWidth="md" sx={{ py: 4, flexGrow: 1 }}>
          <Header />
          <DynamicBreadcrumbs />
          <Notification notification={notification} />
          <Routes>
            <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
            <Route
              path="/anecdotes"
              element={<AnecdoteList anecdotes={anecdotes} />}
            />
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
        </Container>
        <Footer />
      </Stack>
    </Router>
  )
}

export default App
