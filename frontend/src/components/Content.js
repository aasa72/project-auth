import React, { useEffect, useState } from 'react';
import { user } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import styled  from 'styled-components'

const Title = styled.h1`
  margin: 10px;
  padding: 10px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
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

const secretURL = "http://localhost:8080/secrets";



export const Content = () => {
  const [message, setMessage] = useState()
  const accessToken = useSelector((store) => store.user.login.accessToken);

  useEffect (() => {
    fetch(secretURL, {
      method: 'GET',
      headers: { Authorization: accessToken },
    })
    .then((res) => res.json())
    // .then((json) => (console.log(json.message)))
    .then((json) => setMessage(json.message))
    .catch((error) => {
      console.error('Error:', error);
    })
  }, [])

  const dispatch = useDispatch();
  
  const logout = () => {
   dispatch(user.actions.logout());
  };

  return (
    <article>
      <Title>{message}</Title>
      <Button
       type = "submit"
       onClick = { logout }
       >Log out</Button>
    </article>
  )};