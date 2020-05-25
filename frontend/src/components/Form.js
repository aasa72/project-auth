import React, { useState } from 'react'
import styled  from 'styled-components'

const URL = ""

const Wrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
margin: 10px;
padding: 10px;
`
const Section = styled.section`
margin: 10px;
padding:10px;
font-size: 20px;
background-color: lightgrey;
`
const Title = styled.h1`
  margin: 10px;
  padding: 10px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`
const Input = styled.input`
  display: block;
  padding: 10px;
  margin: 10px auto;
  font-size: 25px;
  border-radius: 2px;
  border: 1px solid black;
`
const Button = styled.button`
  display: block;
  padding: 10px;
  margin: 10px auto;
  font-size: 25px;
  background-color: grey;
  border: 1px solid black;
  border-radius: 2px;
`
const Paragraph = styled.p`
  margin: 10px;
  padding: 10px;
  text-align: center;
`


export const Form = props => {
  const [signUp, setSignUp] = useState('');
  const [signIn, setSignIn] = useState('');

  const handleSubmit = event => {
    event.preventDefault()
    
    fetch (URL, 
      {
        method: "POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify({signUp})
      })
      .then (() => {
        setSignUp('')
        props.onFormSubmit(signUp)
      })
      .then (() => {
        setSignIn('')
        props.onFormSubmit(signIn)
      })
      .catch(err => console.log("error:", err))
  };

  return(
    <Wrapper>
      <Section>
        <Title>Sign Up</Title>
        <Paragraph>If you do not have an account, please sign up.</Paragraph>
        <form onChange={event => setSignUp(event.target.value)}>
          <Input
            type = "text"
            placeholder = "name"
            /><br/>
          <Input 
            type = "email"
            placeholder = "email"/><br/>
          <Input 
            type = "password"
            placeholder = "password"/><br/>
          <Button 
            type= "submit" 
            onClick = {handleSubmit}>
            Sign Up
          </Button>
        </form>
      </Section>
      <Section>
        <Title>Sign In</Title>
        <Paragraph>Sign in to your account.</Paragraph>
        <form onChange={event => setSignIn(event.target.value)}>
          <Input 
            type = "email"
            placeholder ="email"/><br/>
          <Input 
            type = "password"
            placeholder = "password"/><br/>
          <Button 
            type= "submit" 
            onClick = {handleSubmit}>
            Sign In
          </Button>
        </form>
      </Section>
    </Wrapper>
  )
} 