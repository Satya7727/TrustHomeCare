import React from "react";
import Routes from "./Routes";
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <Routes />
    </div>
  );
}

export default App;
