import { API_URL } from './config';

export const studentAPI = {
    getStudents: async () => {
        try {
            const response = await fetch(`${API_URL}/api/student/GetStudent`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching students:', error);
            throw error;
        }
    }
};
