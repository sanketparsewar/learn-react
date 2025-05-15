import { useState } from "react";
function App() {
  const [color, setColor] = useState("#ffffff");
  const colors = ["#000000", "#ffffff", "#f8fafc", "#f1f5f9", "#e2e8f0", "#cbd5e1", "#94a3b8", "#64748b", "#475569", "#334155", "#1e293b", "#0f172a", "#dc2626", "#ef4444", "#f87171", "#22c55e", "#10b981", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e", "#eab308", "#f59e0b", "#f97316", "#fb923c"];
  const changeColor=()=>{
    setColor(colors[Math.floor(Math.random() * colors.length)])
  }

  return (
    <div
      className="w-full h-screen duration-300 flex items-center justify-center "
      style={{ background: color }}
    >
      <div className="shadow-amber-50 shadow-xl  w-100 h-50 text-center rounded-xl flex gap-2 items-center justify-center ">
      {/* onClick={} this needs function not the returned value so we cannot write this
        onClick={setColor('red')} so write callback which is function onClick={()=>setColor('red')} */}
        <button
          className="rounded-xl px-2 py-1 border-1 bg-red-400 cursor-pointer"
          onClick={()=>setColor(colors[Math.floor(Math.random() * colors.length)])}
        >
          Change color
        </button>
        <button
          className="rounded-xl px-2 py-1 border-1 bg-red-400 cursor-pointer"
          onClick={changeColor}
        >
          Change color
        </button>
      </div>
    </div>
  );
}

export default App;
