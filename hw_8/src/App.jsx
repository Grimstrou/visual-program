import React, { useState, useEffect } from 'react';
import DataSet from './components/DataSet';
import LogFilter from './components/LogFilter';
import LogTable from './components/LogTable';
import { LogService } from './services/LogService';
import './App.css';

function App() {
    const [comments, setComments] = useState([]);
    const [logs, setLogs] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchComments();
        fetchLogs();
    }, []);

    useEffect(() => {
        fetchLogs();
    }, [filters]);

    const fetchComments = async () => {
        try {
            const response = await fetch('http://localhost:5117/comments');
            if (!response.ok) throw new Error('Failed to fetch comments');
            const data = await response.json();
            setComments(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchLogs = async () => {
        try {
            const data = await LogService.getLogs(filters);
            setLogs(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleAddComment = async (newComment) => {
        try {
            const response = await fetch('http://localhost:5117/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComment),
            });
            if (!response.ok) throw new Error('Failed to add comment');
            const data = await response.json();
            setComments([...comments, data]);
            fetchLogs();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdateComment = async (updatedComment) => {
        try {
            const response = await fetch(`http://localhost:5117/comments/${updatedComment.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedComment),
            });
            if (!response.ok) throw new Error('Failed to update comment');
            const data = await response.json();
            setComments(comments.map(c => c.id === data.id ? data : c));
            fetchLogs();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteComments = async (selectedIds) => {
        try {
            await Promise.all(selectedIds.map(id =>
                fetch(`http://localhost:5117/comments/${id}`, {
                    method: 'DELETE',
                })
            ));
            setComments(comments.filter(c => !selectedIds.includes(c.id)));
            fetchLogs();
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="App">
            <h1>Comments Management</h1>
            <DataSet
                data={comments}
                onAdd={handleAddComment}
                onUpdate={handleUpdateComment}
                onDelete={handleDeleteComments}
            />

            <h2>System Logs</h2>
            <LogFilter filters={filters} onFilterChange={setFilters} />
            <LogTable logs={logs} />
        </div>
    );
}

export default App;