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
        onFilterChange({ ...filters, [type]: value });
    };

    return (
        <div className="log-filter">
            <select
                value={filters.level || ''}
                onChange={handleLevelChange}
                className="filter-select"
            >
                <option value="">All Levels</option>
                <option value="Information">Information</option>
                <option value="Warning">Warning</option>
                <option value="Error">Error</option>
            </select>

            <input
                type="text"
                placeholder="Search logs..."
                value={filters.search}
                onChange={handleSearch}
                className="filter-input"
            />

            <div className="date-filters">
                <input
                    type="datetime-local"
                    onChange={e => handleDateChange(e, 'startDate')}
                    className="date-input"
                />
                <input
                    type="datetime-local"
                    onChange={e => handleDateChange(e, 'endDate')}
                    className="date-input"
                />
            </div>
        </div>
    );
};

export default LogFilter; 