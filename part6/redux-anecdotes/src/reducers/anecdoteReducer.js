import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    create(state, action) {
      const content = action.payload
      state.push({
        content,
        votes: 0,
      })
    },

    vote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find((a) => a.id === id)

      if (!anecdoteToVote) return state

      return state.map((anecdote) =>
        anecdote.id !== id
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 }
      )
    },

    append(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { create, vote, append, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer
