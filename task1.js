import React, { useState } from "react";

function ProgressBar() {
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    let start;
    let animationFrame;

    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / 2000, 1);
      setWidth(progress * 100);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    }

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div style={{
      width: "100%",
      height: 16,
      background: "#ccc",
      borderRadius: 4,
      margin: "12px 0",
      overflow: "hidden"
    }}>
      <div style={{
        width: `${width}%`,
        height: "100%",
        background: "green",
        transition: "width 0.1s linear"
      }} />
    </div>
  );
}

export default function App() {
  const [bars, setBars] = useState([]);

  return (
    <div style={{ padding: 10 }}>
      <button onClick={() => setBars(b => [...b, {}])}>Add</button>
      <div>
        {bars.map((_, idx) => (
          <ProgressBar key={idx} />
        ))}
      </div>
    </div>
  );
}
