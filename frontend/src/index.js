// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Material UI의 기본 CSS Baseline을 사용하려면 추가
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme(); // 기본 테마 생성 또는 사용자 정의

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* CSS 리셋 */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);


//main.jsx