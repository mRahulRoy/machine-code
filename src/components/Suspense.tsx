"use client"
import { Suspense, useState } from 'react';

// Simple cache
let dataCache:any = null;

// Function jo promise throw karta hai
function getData() {
  // Agar data hai, return karo
  if (dataCache) {
    return dataCache;
  }
  
  // Nahi hai? Promise throw karo! 💥
  const promise = new Promise((resolve:any) => {
    setTimeout(() => {
      dataCache = "Hello, Data loaded!";
      resolve();
    }, 2000);
  });
  
  throw promise; // 👈 Yahi magic!
}

// Component jo data display karta hai
function DataComponent() {
  const data = getData();
  return <div>✅ {data}</div>;
}

export default function App() {
  const [show, setShow] = useState(false);
  
  return (
    <div style={{ padding: '40px' }}>
      <button onClick={() => {
        dataCache = null; // Reset
        setShow(!show);
      }}>
        Toggle Data
      </button>
      
      {show && (
        <Suspense fallback={<div>⏳ Loading...</div>}>
          <DataComponent />
        </Suspense>
      )}
    </div>
  );
}
