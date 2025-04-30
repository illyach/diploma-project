<template>
    <div class="chat-wrapper">
      <div class="chat-box">
        <!-- Список повідомлень -->
        <div class="messages">
          <div v-for="(message, index) in answer" :key="index" :class="message.from">
            <div class="message-text">{{ message.text }}</div>
          </div>
        </div>
  
        <!-- Вибір популярних запитів -->
        <div class="popular-queries">
          <button @click="sendQuery('Largest Chain by Daily Users')">Largest Chain by Daily Users</button>
          <button @click="sendQuery('What is the most trending blockchain?')">Most Trending Blockchain</button>
          <button @click="sendQuery('Which blockchain has the highest TVL?')">Highest TVL Blockchain</button>
        </div>
  
        <!-- Поле для вводу нового запиту -->
        <el-input v-model="userInput" placeholder="Ask a question..." @keyup.enter="sendQuery(userInput)" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Заміна messages на answer
  const answer = ref([
    { text: 'Hello! How can I help you today?', from: 'server' }
  ]);
  
  // Модель для вводу
  const userInput = ref('');
  
  // Відправка запиту на сервер
  const sendQuery = (query) => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        api_key: 'tm-f7536ce8-2d7f-443c-a4fb-3dbea0ad17d9',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        messages: [{ user: query }]
      })
    };
  
    // Додаємо запит користувача до чату
    answer.value.push({ text: query, from: 'user' });
  
    // Відправляємо запит на сервер
    fetch('https://api.tokenmetrics.com/v2/tmai', options)
      .then(res => res.json())
      .then(res => {
        // Додаємо відповідь сервера до чату
        console.log('відповідь сервера', res);
        answer.value.push({ text: res.answer || 'No response from server', from: 'server' });
      })
      .catch(err => {
        answer.value.push({ text: 'Error: Could not fetch response', from: 'server' });
      });
  
    // Очищаємо поле вводу після відправки
    userInput.value = '';
  };
  </script>
  
  <style scoped>
  .chat-wrapper {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #444;
    border-radius: 8px;
    background-color: #1a1a1a; /* Темний фон */
    color: white; /* Білий текст для кращої видимості */
  }
  
  .chat-box {
    display: flex;
    flex-direction: column;
    height: 400px;
    overflow-y: auto;
  }
  
  .messages {
    flex: 1;
    padding: 10px;
    background-color: #2c2c2c; /* Темніший фон для списку повідомлень */
    border-bottom: 1px solid #444;
  }
  
  .messages .message-text {
    padding: 8px;
    margin-bottom: 10px;
    background-color: #444; /* Темний фон для повідомлень */
    border-radius: 15px;
  }
  
  .messages .user .message-text {
    background-color: #3a3a3a; /* Темно-сірий фон для повідомлень користувача */
    align-self: flex-end;
  }
  
  .messages .server .message-text {
    background-color: #555; /* Трохи світліший фон для повідомлень від сервера */
  }
  
  .popular-queries {
    margin-top:10px;
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }
  
  .popular-queries button {
    background-color: #797979;
    color: white;
    padding: 7px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .popular-queries button:hover {
    background-color: #0056b3;
  }
  
  .el-input {
    margin-top: 10px;
    background-color: #333; /* Темний фон для поля вводу */
    color: white; /* Білий текст в полі вводу */
    border: 1px solid #444;
  }
  </style>
  