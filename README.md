###  Graph Data Visualization Frontend
This project is a frontend application built with React that visualizes graph data, such as the number of humans or average position over time. It fetches data from an API and renders interactive charts with Recharts and HeatmapComponent.

![image](https://github.com/user-attachments/assets/b63c9e00-dcc4-4175-bd5a-0a956ba300e3)

**How to Use**
Select a Metric: Choose from available metrics (e.g., Number of Humans, Average Position X) from the dropdown.

Adjust Time Range: Use the input fields to specify the start and end time for the graph data.

View the Graph: The selected metric will be displayed in a line graph format.

Heatmap Visualization: A heatmap will also be rendered based on the selected time range.

**Features**
Metric Selection: Users can select a metric (e.g., Number of Humans or Average Position X) to display.

Date Range Selection: Users can input a start and end time to filter the graph data.

Graph Visualization: The frontend displays a LineChart showing the selected metric over time.

Heatmap Visualization: A heatmap is rendered alongside the graph for additional insights.

**Technologies Used**

React: JavaScript library for building user interfaces.

Recharts: Charting library for rendering interactive charts.

Axios: HTTP client for fetching data from the backend.

HTML5 & CSS3: For basic structure and styling.

Heatmap.js: A JavaScript library used to create heatmaps based on dynamic data.

**Setup Instructions
Prerequisites**
Ensure you have the following installed:

Node.js (preferably the LTS version)

npm (comes with Node.js)

**Start the React Development Server**
Run npm start in the frontend project folder to start the React app on localhost:3000.
