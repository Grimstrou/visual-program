const API_URL = 'http://localhost:5117';

export const LogService = {
    async getLogs(filters = {}) {
        const queryParams = new URLSearchParams();
        if (filters.level) queryParams.append('level', filters.level);
        if (filters.search) queryParams.append('search', filters.search);
        if (filters.startDate) queryParams.append('startDate', filters.startDate);
        if (filters.endDate) queryParams.append('endDate', filters.endDate);

        const response = await fetch(`${API_URL}/logs/search?${queryParams}`);
        if (!response.ok) {
            throw new Error('Failed to fetch logs');
        }
        return response.json();
    },

    async addComment(comment) {
        const response = await fetch(`${API_URL}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        });
        if (!response.ok) {
            throw new Error('Failed to add comment');
        }
        return response.json();
    },

    async updateComment(id, comment) {
        const response = await fetch(`${API_URL}/comments/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        });
        if (!response.ok) {
            throw new Error('Failed to update comment');
        }
        return response.json();
    },

    async deleteComment(id) {
        const response = await fetch(`${API_URL}/comments/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete comment');
        }
    }
}; 