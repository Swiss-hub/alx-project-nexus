import React from "react";
import { StrictMode } from 'react'
import "flowbite/dist/flowbite.css";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <App />
  </StrictMode>
);
