import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { useMemo } from 'react';
import TaskTracker from './components/tasktracker/TaskTracker';

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
      <TaskTracker />
    </ThemeProvider>
  );
}

export default App;
