import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuestDBData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from Express API
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/questdb/data');
                setData(response.data.data);  // Set the fetched data in state
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>QuestDB Data</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Number of Humans</th>
                        <th>X Position</th>
                        <th>Y Position</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row.timestamp}</td>
                            <td>{row.num_humans}</td>
                            <td>{row.x_position}</td>
                            <td>{row.y_position}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuestDBData;
