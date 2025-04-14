import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DataSet from './components/DataSet';

describe('DataSet Component', () => {
  const headers = [
    { property: 'id', label: 'ID' },
    { property: 'name', label: 'Name' },
    { property: 'age', label: 'Age' },
  ];

  const data = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 },
  ];

  test('Правильно обрабатывает заголовки и данные', () => {
    render(<DataSet headers={headers} data={data} />);

    headers.forEach((header) => {
      expect(screen.getByText(header.label)).toBeInTheDocument();
    });

    data.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.age.toString())).toBeInTheDocument();
    });
  });

  test('Выделяет строку при нажатии', () => {
    render(<DataSet headers={headers} data={data} />);

    const firstRow = screen.getAllByRole('row')[1];
    fireEvent.click(firstRow);

    expect(firstRow).toHaveClass('selected');
  });

  test('Позволяет выделять несколько строк с помощью Ctrl', () => {
    render(<DataSet headers={headers} data={data} />);

    const firstRow = screen.getAllByRole('row')[1];
    const secondRow = screen.getAllByRole('row')[2];

    fireEvent.click(firstRow);
    fireEvent.click(secondRow, { ctrlKey: true });

    expect(firstRow).toHaveClass('selected');
    expect(secondRow).toHaveClass('selected');
  });

  test('Убирает выделение строки при повторном нажатии', () => {
    render(<DataSet headers={headers} data={data} />);

    const firstRow = screen.getAllByRole('row')[1];
    fireEvent.click(firstRow);
    fireEvent.click(firstRow);

    expect(firstRow).not.toHaveClass('selected');
  });

  test('Сбрасывает выделение предыдущих строк при клике без Ctrl', () => {
    render(<DataSet headers={headers} data={data} />);

    const firstRow = screen.getAllByRole('row')[1];
    const secondRow = screen.getAllByRole('row')[2];

    fireEvent.click(firstRow);
    fireEvent.click(secondRow);

    expect(firstRow).not.toHaveClass('selected');
    expect(secondRow).toHaveClass('selected');
  });
});