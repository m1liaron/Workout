
const Graph = () => {
    const dataPoints = [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 4 },
        { x: 3, y: 8 },
        { x: 4, y: 16 },
        { x: 5, y: 25 },
      ];
    
      // Find the maximum values for x and y to calculate scaling
      const maxX = Math.max(...dataPoints.map((point) => point.x));
      const maxY = Math.max(...dataPoints.map((point) => point.y));
    
      // Calculate scaling factors to fit the graph within the container
      const scaleX = 100 / maxX; // 100 is the width of the graph container
      const scaleY = 100 / maxY; // 100 is the height of the graph container
    
      // Map the data points to create the line on the graph
      const graphLine = dataPoints.map((point) => ({
        x: point.x * scaleX,
        y: 100 - point.y * scaleY,
      }));

    return (
        <>
            <div className="graph-container">
                <svg className="graph">
                    <line x1="0" y1="0" x2="0" y2="100" className="axis" />
                    <line x1="0" y1="100" x2="100" y2="100" className="axis" />

                    <polyline points={graphLine.map((point) => `${point.x},${point.y}`).join(" ")} className="graph-line" />
                </svg>
            </div>
        </>
    )
}

export default Graph;
