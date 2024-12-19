import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import { Provider } from 'react-redux' // for forwarding state to components
import reducer from './reducer'

const store = createStore(reducer)
console.log(store)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD',
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD',
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK',
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO',
    })
  }

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}

renderApp()
store.subscribe(renderApp)
