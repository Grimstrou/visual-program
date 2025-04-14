import React, { useState, useEffect, useReducer } from 'react';
import DataSet from './components/DataSet';
import './App.css';

const initialState = {
  comments: [],
  loading: true,
  error: null,
};

function dataReducer(state, action) {
  switch (action.type) {
    case 'SET_COMMENTS':
      return { ...state, comments: action.payload, loading: false };

    case 'ADD_COMMENT':
      return { ...state, comments: [...state.comments, action.payload] };

    case 'UPDATE_COMMENT':
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.id ? action.payload : comment
        ),
      };

    case 'DELETE_COMMENTS':
      const updatedComments = state.comments
        .filter((comment) => !action.payload.includes(comment.id))
        .map((comment, index) => ({
          ...comment,
          id: index + 1,
        }));
      return { ...state, comments: updatedComments };

    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const [filterText, setFilterText] = useState('');

  // Загрузка данных с сервера
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then((response) => response.json())
      .then((data) => dispatch({ type: 'SET_COMMENTS', payload: data }))
      .catch((error) => dispatch({ type: 'SET_ERROR', payload: error.message }));
  }, []);

  // Добавление нового комментария
  const handleAddComment = (newComment) => {
    const lastId = state.comments.reduce((max, comment) => Math.max(max, comment.id), 0);
    const optimisticComment = { ...newComment, id: lastId + 1 };
    dispatch({ type: 'ADD_COMMENT', payload: optimisticComment });

    fetch('https://jsonplaceholder.typicode.com/comments', {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка при добавлении комментария');
        }
        return response.json();
      })
      .then((data) => {
        dispatch({ type: 'UPDATE_COMMENT', payload: data });
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: 'DELETE_COMMENTS',
          payload: [optimisticComment.id],
        });
      });
  };

  // Обновление комментария
  const handleUpdateComment = (updatedComment) => {
    dispatch({ type: 'UPDATE_COMMENT', payload: updatedComment });

    fetch(`https://jsonplaceholder.typicode.com/comments/${updatedComment.id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedComment),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка при обновлении комментария');
        }
        return response.json();
      })
      .then((data) => {
        dispatch({ type: 'UPDATE_COMMENT', payload: data });
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: 'SET_ERROR', payload: error.message });
      });
  };

  // Удаление выделенных комментариев
  const handleDeleteComments = (selectedIds) => {
    dispatch({ type: 'DELETE_COMMENTS', payload: selectedIds });

    selectedIds.forEach((id) => {
      if (typeof id !== 'number') return;

      fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
        method: 'DELETE',
      }).catch((error) => {
        console.error(error);
        dispatch({ type: 'SET_ERROR', payload: error.message });
      });
    });
  };

  // Фильтрация данных
  const filteredData = state.comments.filter((item) =>
    item.body.toLowerCase().includes(filterText.toLowerCase())
  );

  // Заголовки таблицы
  const headers = [
    { property: 'id', label: 'ID' },
    { property: 'name', label: 'Имя' },
    { property: 'email', label: 'Email' },
    { property: 'body', label: 'Комментарий' },
  ];

  return (
    <div className="App">
      <h1>Таблица комментариев</h1>

      {/* Панель фильтрации */}
      <input
        type="text"
        placeholder="Поиск по комментарию..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        style={{ marginBottom: '20px', padding: '8px', width: '100%' }}
      />

      {state.loading ? (
        <p>Загрузка данных...</p>
      ) : state.error ? (
        <p>{state.error}</p>
      ) : (
        <DataSet
          headers={headers}
          data={filteredData}
          onAdd={(newComment) => handleAddComment(newComment)}
          onDelete={(selectedIds) => handleDeleteComments(selectedIds)}
          onUpdate={(updatedComment) => handleUpdateComment(updatedComment)}
        />
      )}
    </div>
  );
}

export default App;