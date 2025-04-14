import React, { useState } from 'react';

const DataSet = ({ data, columns, rowKey = 'id', onRowSelect }) => {
  // Если columns не переданы, используем свойства объектов из data
  const headers = columns || Object.keys(data[0]).map((key) => ({ key, label: key }));

  // Состояние для отслеживания выделенных строк
  const [selectedRows, setSelectedRows] = useState([]);

  // Обработчик клика по строке
  const handleRowClick = (event, rowData) => {
    event.stopPropagation();

    const isCtrlPressed = event.ctrlKey;

    // Проверяем, выбрана ли уже эта строка
    const isSelected = selectedRows.some((row) => row[rowKey] === rowData[rowKey]);

    if (isSelected && !isCtrlPressed) {
      // Если строка уже выбрана и Ctrl не нажата, убираем выделение
      setSelectedRows(selectedRows.filter((row) => row[rowKey] !== rowData[rowKey]));
    } else {
      // Если строка не выбрана или Ctrl нажата, добавляем её к выделенным
      if (!isCtrlPressed) {
        // Если Ctrl не нажата, сбрасываем все предыдущие выделения
        setSelectedRows([rowData]);
      } else {
        setSelectedRows([...selectedRows, rowData]);
      }
    }

    // Вызываем callback на изменение выбора строк
    onRowSelect?.(selectedRows);
  };

  return (
    <div className="data-set">
      {/* Шапка таблицы */}
      <div className="header-row">
        {headers.map((header) => (
          <div key={header.key} className="header-cell">
            {header.label}
          </div>
        ))}
      </div>

      {/* Тело таблицы */}
      <div className="body">
        {data.map((row) => (
          <div
            key={row[rowKey]}
            className={`row ${selectedRows.some((r) => r[rowKey] === row[rowKey]) ? 'selected' : ''}`}
            onClick={(event) => handleRowClick(event, row)}
          >
            {/* Область для выделения строки */}
            <div className="select-area" />

            {/* Ячейки строки */}
            {headers.map((header) => (
              <div key={header.key} className="cell">
                {row[header.key] || '-'}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataSet;