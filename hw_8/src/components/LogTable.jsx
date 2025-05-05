import React from 'react';

const LogTable = ({ logs }) => {
    return (
        <div className="log-table-container">
            <table className="log-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Автор</th>
                        <th>Email</th>
                        <th>Текст</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map(log => (
                        <tr key={log.id}>
                            <td>{log.id}</td>
                            <td>{log.author}</td>
                            <td>{log.email}</td>
                            <td>{log.text}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LogTable; 