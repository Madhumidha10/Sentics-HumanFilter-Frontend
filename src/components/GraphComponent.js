

import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
 import HeatmapComponent from './HeatmapComponent';
const GraphComponent = () => {
  const [metric, setMetric] = useState('average_pos_x'); // Default metric
  const [data, setData] = useState([]);
  const [startTime, setStartTime] = useState(1662896469284); // Example start time
  const [endTime, setEndTime] = useState(1662999999999);   // Example end time

  // Fetch data from the API
  const fetchGraphData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:4000/questdb/graph-data', {
        params: {
          metric: metric,
          startTime: startTime,
          endTime: endTime
        },
      });

      console.log('Fetched Data:', response.data);  // Log the fetched data

      // Check if the data is an array and has valid structure
      if (response.data && Array.isArray(response.data) ) {
        setData(response.data);  // Set the data to the state
      } else {
        console.error('Unexpected data format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching graph data:', error);
    }
  }, [metric, startTime, endTime]);

  // Trigger fetch whenever the metric, startTime, or endTime changes
  useEffect(() => {
    fetchGraphData();
  }, [fetchGraphData]);

  return (
    <div>
    <div className='form-container' >
      <h3>Select Metric to Display Graph</h3>

      {/* Dropdown to select the metric */}
      <select value={metric} onChange={(e) => setMetric(e.target.value)}>
        <option value="number_of_humans">Number of Humans</option>
        <option value="average_pos_x">Average Position X</option>
      </select>

      {/* Input for start time */}
      <input
        type="number"
        value={startTime}
        onChange={(e) => setStartTime(Number(e.target.value))}
        placeholder="Start Time"
      />

      {/* Input for end time */}
      <input
        type="number"
        value={endTime}
        onChange={(e) => setEndTime(Number(e.target.value))}
        placeholder="End Time"
      />
</div>
      {/* Graph rendering */}
      <div>
        <h3>Heat Map and Graph Data</h3>
        {data.length === 0 ? (
          <p>No data available for the selected time range.</p>
        ) : (
          <ResponsiveContainer width="100%" height={400} class="graph-container">
                <HeatmapComponent startTime={startTime} endTime={endTime} class="heatmap-container" />
            <LineChart data={data} >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(timestamp) => {
                  const date = new Date(timestamp);
                  return date.toLocaleTimeString();  // Format timestamp to human-readable time
                }}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleString();  // Show formatted date in the tooltip
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
        
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
};

export default GraphComponent;













