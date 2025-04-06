import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import heatmap from 'heatmap.js'; // Import heatmap.js

const HeatmapComponent = ({ startTime, endTime }) => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const heatmapRef = useRef(null); // To hold the heatmap container

  // Fetch data from the API
  const fetchGraphData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('http://localhost:4000/questdb/heatmap-data', {
        params: { startTime, endTime },
      });

      console.log('Fetched Data:', response.data);

      if (response.data && Array.isArray(response.data)) {
        setHeatmapData(response.data);
      } else {
        setError('Unexpected data format');
      }
    } catch (error) {
      console.error('Error fetching graph data:', error);
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  }, [startTime, endTime]);

  useEffect(() => {
    fetchGraphData();
  }, [fetchGraphData]);

  useEffect(() => {
    if (heatmapData.length === 0 || !heatmapRef.current) return;

    // Initialize the heatmap
    const heatmapInstance = heatmap.create({
      container: heatmapRef.current, // Attach the heatmap to the container
      radius: 20, // Size of the points
      maxOpacity: 0.6,
      minOpacity: 0.1,
      blur: 0.9,
    });

    // Transform data into heatmap.js format
    const transformedData = heatmapData.map((point) => ({
      x: point.pos_x, // x-coordinate
      y: point.pos_y, // y-coordinate
      value: point.Intensity || (point.pos_x + point.pos_y) / 2, // intensity (can be adjusted based on the data)
    }));

    // Add the data to the heatmap
    heatmapInstance.setData({
      max: 1, // Max intensity
      min: 0, // Min intensity
      data: transformedData,
    });
  }, [heatmapData]);

  if (loading) return <div>Loading heatmap data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (heatmapData.length === 0) return <div>No data available for the selected time range.</div>;

  return (
    <div style={{justifyItems:'center'}}>

      <div
        ref={heatmapRef}
        style={{
          width: '100px',
          height: '100px',
          background: '#f0f0f0', // Background color for better visibility
          position: 'relative',
         
        }}
      />
    </div>
  );
};

export default HeatmapComponent;
