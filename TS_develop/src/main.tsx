
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme.ts';


createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
        </ThemeProvider>
    </BrowserRouter>

)
