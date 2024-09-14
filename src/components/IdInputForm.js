import React, { useState } from 'react';
import { Button, TextField, CircularProgress, Box, Typography } from '@mui/material';

const IdInputForm = () => {
  const [postId, setPostId] = useState('');
  const [postData, setPostData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPostAndUserData = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      
      if (!postResponse.ok) {
        throw new Error('Ошибка в запросе поста');
      }

      const postJson = await postResponse.json();
      setPostData(postJson);

      const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${postJson.userId}`);
      
      if (!userResponse.ok) {
        throw new Error('Ошибка в запросе пользователя');
      }

      const userJson = await userResponse.json();
      setUserData(userJson);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
      {isLoading && (
        <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)', zIndex: 9999 }}>
          <CircularProgress />
        </Box>
      )}
      <TextField 
        label="ID поста" 
        variant="outlined" 
        value={postId} 
        onChange={(e) => setPostId(e.target.value)} 
        sx={{ mb: 2, width: '300px' }} 
      />
      <Button variant="contained" color="primary" onClick={fetchPostAndUserData} disabled={isLoading}>
        {isLoading ? 'Загрузка...' : 'Получить данные'}
      </Button>

      {error && <Typography color="error">{error}</Typography>}

      {postData && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Title: {postData.title}</Typography>
          <Typography variant="body1">{postData.body}</Typography>
        </Box>
      )}

      {userData && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">User Info:</Typography>
          <Typography variant="body1">Name: {userData.name}</Typography>
          <Typography variant="body1">Email: {userData.email}</Typography>
        </Box>
      )}
    </Box>
  );
};


export default IdInputForm;
