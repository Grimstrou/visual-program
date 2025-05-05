import React from 'react';

const LogFilter = ({ filters, onFilterChange }) => {
    const handleLevelChange = (e) => {
        onFilterChange({ ...filters, level: e.target.value });
    };

    const handleSearch = (e) => {
        onFilterChange({ ...filters, search: e.target.value });
    };

    const handleDateChange = (e, type) => {
        const value = e.target.value;
        if (type === 'start') {
            onFilterChange({ ...filters, startDate: value ? new Date(value) : null });
        } else {
            onFilterChange({ ...filters, endDate: value ? new Date(value) : null });
        }
    };

    return (
        <div className="log-filter">
            <select
                value={filters.level || ''}
                onChange={handleLevelChange}
                className="filter-select"
            >
                <option value="">Все уровни</option>
                <option value="Information">Information</option>
                <option value="Warning">Warning</option>
                <option value="Error">Error</option>
            </select>

            <input
                type="text"
                placeholder="Поиск по тексту комментария..."
                value={filters.search}
                onChange={handleSearch}
                className="filter-input"
            />

            <div className="date-filters">
                <input
                    type="datetime-local"
                    onChange={(e) => handleDateChange(e, 'start')}
                    className="date-input"
                />
                <input
                    type="datetime-local"
                    onChange={(e) => handleDateChange(e, 'end')}
                    className="date-input"
                />
            </div>
        </div>
    );
};

export default LogFilter; 