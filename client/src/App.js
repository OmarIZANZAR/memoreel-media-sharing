import React, { useEffect } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AnimatePresence } from 'framer-motion'

import NotificationZone from './components/NotificationZone'
import NavBar from './components/NavBar'
import Form from './components/Form'
import Home from './components/Home'

import { getPosts } from './actions/posts'

function App() {
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(()=>{
    dispatch(getPosts())
  },[dispatch])

  useEffect(()=>{
    window.scrollTo(0,0)
  },[location])
  
  return (
    <div className="app">
        <div className="myappbg">
          <div className="overlay"></div>
        </div>

        <NavBar />
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.key} >
            <Route exact path={["/form", "/form/:postId"]}>
              <Form />
            </Route>

            <Route path="/">
              <Home />
            </Route>

          </Switch>
        </AnimatePresence>

        <NotificationZone />
    </div>
  );
}

export default App;
