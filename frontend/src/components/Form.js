import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { user } from '../reducers/user';
import { Content } from './Content';
import styled  from 'styled-components'

const signUpURL = "https://top-secret-auth.herokuapp.com/users";
const logInURL = "https://top-secret-auth.herokuapp.com/sessions";

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
const Warning = styled.section`
display: flex;
flex-direction: row;
align-items: center;
margin: 10px;
padding:10px;
font-size: 20px;
background-color: Firebrick;
`


export const Form = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector((store) => store.user.login.accessToken);
  const statusMessage = useSelector((store) => store.user.login.statusMessage);
  
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loginEmail, setLoginEmail ] = useState('');
  const [ loginPassword, setLoginPassword ] = useState('');

  const handleLoginSuccess = (loginResponse) => {
    // For debugging only
    const statusMessage = JSON.stringify(loginResponse.message);
    dispatch(user.actions.setStatusMessage({ statusMessage }));

    // Set the login info
    dispatch(
      user.actions.setAccessToken({ accessToken: loginResponse.accessToken })
    );
    dispatch(
      user.actions.setUserId({ userId: loginResponse.userId }));
  };

  const handleLoginFailed = (loginError) => {
    const statusMessage = JSON.stringify(loginError.message);
    dispatch(user.actions.setStatusMessage({ statusMessage }));
    // Clear login values
    dispatch(user.actions.logout());
  };

  // Sign up handler
  const handleSignup = (event) => {
    event.preventDefault();

    fetch(signUpURL, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((json) => handleLoginSuccess(json))
      .catch((err) => handleLoginFailed(err));
      setName('')
      setEmail('')
      setPassword('')
  };

  // Login handler
  const handleLogin = (event) => {
    event.preventDefault();

    fetch(logInURL, {
      method: 'POST',
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((json) => handleLoginSuccess(json))
      .catch((err) => handleLoginFailed(err));
      setLoginEmail('')
      setLoginPassword('')
  };
  

  if (!accessToken) {
    return(
    <Wrapper>
      <Section>
        <Title>Sign Up</Title>
        <Paragraph>If you do not have an account, please sign up.</Paragraph>

        <form onSubmit={(e) => handleSignup(e)}>
          <Input
            type = "text"
            required
            minLength={2}
            maxLength={20}
            value = { name }
            placeholder = "name"
            onChange = {event => setName(event.target.value)}
            /><br/>
          <Input 
            type="email"
            required
            minLength={3}
            value = { email }
            placeholder = "email"
            onChange = {event => setEmail(event.target.value)}
            /><br/>
          <Input 
            type="password"
            required
            minLength={8}
            value = { password }
            placeholder = "password"
            onChange = {event => setPassword(event.target.value)}
            /><br/>
          <Button type = "submit">
            Sign Up
          </Button>
        </form>
      </Section>
      {statusMessage && <Warning> <Paragraph> {`${statusMessage}`} </Paragraph> </Warning>}
      <Section>
        <Title>Log In</Title>
        <Paragraph>Log in to your account.</Paragraph>
        <form onSubmit={(e) => handleLogin(e)}>
          <Input 
            type = "email"
            value = { loginEmail }
            placeholder ="email"
            onChange = {event => setLoginEmail(event.target.value)}
            /><br/>
          <Input 
            type = "password"
            value = { loginPassword }
            placeholder = "password"
            onChange = {event => setLoginPassword(event.target.value)}
            /><br/>
          <Button 
            type = "submit">
            Log In
          </Button>
        </form>
      </Section>
    </Wrapper>
  )
}else {
  return(
  <div>
    <Content />
  </div>
  )};
};