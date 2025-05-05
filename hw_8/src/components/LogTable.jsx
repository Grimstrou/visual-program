import React from 'react';

const LogTable = ({ logs }) => {
    return (
        <div className="log-table-container">
            <table className="log-table">
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Level</th>
                        <th>Action</th>
                        <th>Message</th>
                        <th>Exception</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map(log => (
                        <tr key={log.id} className={`log-row ${log.level?.toLowerCase()}`}>
                            <td>{new Date(log.timestamp).toLocaleString()}</td>
                            <td>{log.level}</td>
                            <td>{log.action}</td>
                            <td>{log.message}</td>
                            <td>{log.exception}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LogTable; 