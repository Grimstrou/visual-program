import React from 'react';
import DataSet from './components/DataSet';

const data = [
  { id: 1, name: 'Artem', game: 'DOTA' },
  { id: 2, name: 'Stepan', game: 'LOL' },
  { id: 3, name: 'Alex', game: 'REPO' },
];

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'game', label: 'Game' },
];

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Universal DataSet Component</h1>
      <DataSet
        data={data}
        columns={columns}
        rowKey="id"
        onRowSelect={(selectedRows) => console.log('Selected Rows:', selectedRows)}
      />
    </div>
  );
}

export default App;