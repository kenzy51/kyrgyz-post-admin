import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
  p {
    font-size: 1.2rem;
    margin: 5px 0;
  }
`;

export const AboutSelf = () => {
  const [userData, setUserData] :any = useState(null);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [token]);

  return (
    <Container>
      <Title>Информация о личном кабинете</Title>
      {userData ? (
        <UserInfo>
          <p>ID: {userData.id}</p>
          <p>Login: {userData.login}</p>
          <p>Region: {userData.region}</p>
          {/* Add more user data fields here */}
        </UserInfo>
      ) : (
        <p>Loading user data...</p>
      )}
    </Container>
  );
};
