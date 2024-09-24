import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { useMemo } from 'react';
import TaskTracker from './components/tasktracker/TaskTracker';
import Auth0Initializer from './components/Auth0Initializer.tsx';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: prefersDarkMode ? 'dark' : 'light',
      },
    });
  }, [prefersDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Auth0Initializer />
      <TaskTracker />
    </ThemeProvider>
  );
}

export default App;
