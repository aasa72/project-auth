import React, { useState } from 'react'
import { Form } from './components/Form'
    

export const App = () => {
  const [signUp, setSignUp] = useState();

  const onFormSubmit = signUp => {
    setSignUp (signUp)
    }
  return (
    <div>
      <Form onFormSubmit={onFormSubmit}/>
    </div>
  )
}
