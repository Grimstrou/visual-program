const API_URL = 'http://localhost:5012';

export const LogService = {
    async getLogs(filters = {}) {
        const response = await fetch(`${API_URL}/comments`);
        if (!response.ok) {
            throw new Error('Failed to fetch comments');
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