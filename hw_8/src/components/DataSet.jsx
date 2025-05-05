import React, { useState } from 'react';
import './DataSet.css';

const DataSet = ({
  headers,
  data,
  onAdd,
  onDelete,
  onUpdate,
  renderHeader = (header) => header.label || header.property,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [newComment, setNewComment] = useState({ text: '', author: '', email: '' });

  // Экспорт данных в CSV
  const exportToCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['ID,Text,Author,Email']
        .concat(
          data.map((item) =>
            `${item.id},${item.text},${item.author},${item.email}`.replace(/,/g, ';')
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'comments.csv');
    document.body.appendChild(link);
    link.click();
  };

  const handleRowClick = (index, event) => {
    const isCtrlPressed = event.ctrlKey;
    if (isCtrlPressed) {
      setSelectedRows((prevSelected) =>
        prevSelected.includes(index)
          ? prevSelected.filter((rowIndex) => rowIndex !== index)
          : [...prevSelected, index]
      );
    } else {
      setSelectedRows(isSelected(index) ? [] : [index]);
    }
  };

  const isSelected = (index) => selectedRows.includes(index);

  const getHeaders = () => {
    if (headers && headers.length > 0) {
      return headers;
    }
    if (data && data.length > 0) {
      return Object.keys(data[0]).map((key) => ({ property: key }));
    }
    return [];
  };

  const startEditing = (rowIndex) => {
    setEditingRow(rowIndex);
    setEditedData({ ...data[rowIndex] });
  };

  const cancelEditing = () => {
    setEditingRow(null);
    setEditedData({});
  };

  const saveChanges = () => {
    if (onUpdate && editingRow !== null) {
      onUpdate(editedData);
      setEditingRow(null);
      setEditedData({});
    }
  };

  const handleAddComment = () => {
    if (onAdd) {
      onAdd(newComment);
      setNewComment({ text: '', author: '', email: '' });
    }
  };

  const handleDeleteSelected = () => {
    if (onDelete) {
      const selectedIds = selectedRows.map((index) => data[index].id);
      onDelete(selectedIds);
      setSelectedRows([]);
    }
  };

  return (
    <div>
      <table className="dataSetTable">
        <thead>
          <tr>
            <th className="selectableArea"></th>
            {getHeaders().map((header, index) => (
              <th key={index}>{renderHeader(header)}</th>
            ))}
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={(event) => handleRowClick(rowIndex, event)}
              className={isSelected(rowIndex) ? 'selected' : ''}
            >
              <td className="selectableArea">{isSelected(rowIndex) ? '✓' : ''}</td>
              {getHeaders().map((header, colIndex) => (
                <td key={colIndex}>
                  {editingRow === rowIndex ? (
                    <input
                      type="text"
                      value={editedData[header.property] || ''}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          [header.property]: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item[header.property]
                  )}
                </td>
              ))}
              <td>
                {editingRow === rowIndex ? (
                  <>
                    <button onClick={saveChanges}>Сохранить</button>
                    <button onClick={cancelEditing}>Отмена</button>
                  </>
                ) : (
                  <button onClick={() => startEditing(rowIndex)}>Редактировать</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Форма добавления нового комментария */}
      <div className="form">
        <input
          type="text"
          placeholder="Текст"
          value={newComment.text}
          onChange={(e) =>
            setNewComment({ ...newComment, text: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Автор"
          value={newComment.author}
          onChange={(e) =>
            setNewComment({ ...newComment, author: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Email"
          value={newComment.email}
          onChange={(e) =>
            setNewComment({ ...newComment, email: e.target.value })
          }
        />
        <button onClick={handleAddComment}>Добавить</button>
      </div>

      {/* Кнопка удаления выделенных строк */}
      <button onClick={handleDeleteSelected} disabled={selectedRows.length === 0}>
        Удалить выделенные
      </button>

      {/* Кнопка экспорта в CSV */}
      <button className="exportButton" onClick={exportToCSV}>
        Экспортировать в CSV
      </button>
    </div>
  );
};

export default DataSet;