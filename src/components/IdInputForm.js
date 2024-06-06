import React, { useState } from 'react';

const IdInputForm = () => {
  const [postId, setPostId] = useState('');
  const [postData, setPostData] = useState(null);
  const [userData, setUserData] = useState(null);

  const fetchPostAndUserData = async () => {
    try {
      const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      const postJson = await postResponse.json();
      setPostData(postJson);

      const userId = postJson.userId;
      const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const userJson = await userResponse.json();
      setUserData(userJson);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={postId}
        onChange={(e) => setPostId(e.target.value)}
      />
      <button onClick={fetchPostAndUserData}>Получить данные</button>

      {postData && (
        <div>
          <h2>Title: {postData.title}</h2>
          <p>Body: {postData.body}</p>
        </div>
      )}

      {userData && (
        <div>
          <h3>User Info:</h3>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}
    </div>
  );
};

export default IdInputForm;