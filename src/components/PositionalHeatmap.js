import React, { useEffect, useRef } from 'react';
import heatmap from 'heatmap.js';

const PositionalHeatmap = ({ data }) => {
  const heatmapRef = useRef(null);

  useEffect(() => {
    if (data.length === 0) {
      return;
    }

    const heatmapInstance = heatmap.create({
      container: heatmapRef.current,
      radius: 50, // radius of the circles in the heatmap
      maxOpacity: 0.6,
      minOpacity: 0.1,
      blur: 0.9,
      gradient: {
        0.0: 'blue',
        0.5: 'yellow',
        1.0: 'red',
      },
    });

    // Prepare heatmap data in the correct format
    const heatmapData = data.map(item => ({
      x: item.pos_x * 50,  // Scaling the position
      y: item.pos_y * 50,  // Scaling the position
      value: item.value,  // Intensity value
    }));

    // Set the data to the heatmap instance
    heatmapInstance.setData({
      max: Math.max(...heatmapData.map(item => item.value)), // Set max value based on intensity
      data: heatmapData,
    });
  }, [data]);

  return (
    <div
      ref={heatmapRef}
      // style={{
      //   width: '100%',
      //   height: '100%',
      //   position: 'relative',
      //   marginTop: '20px', // Adding space between graph and heatmap
      // }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2, // Ensure heatmap is on top of the chart
        pointerEvents: 'none', // Prevent the heatmap from interfering with chart interactions
      }}
     
    />
  );
};

export default PositionalHeatmap;
