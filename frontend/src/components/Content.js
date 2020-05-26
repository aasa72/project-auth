import React from 'react';
import { user } from '../reducers/user';
import { useDispatch } from 'react-redux';
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

export const Content = () => {

  const dispatch = useDispatch();
  
  const logout = () => {
   dispatch(user.actions.logout());
  };

  return (
    <article>
      <Title>Welcome</Title>
      <Button
       type = "submit"
       onClick = { logout }
       >Log out</Button>
    </article>
  )};