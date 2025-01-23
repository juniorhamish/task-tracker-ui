import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { useMemo } from 'react';
import TaskTracker from './components/tasktracker/TaskTracker';
import Auth0Initializer from './components/Auth0Initializer';
import LoggingMetaData from './logging/LoggingMetaData';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Auth0Initializer />
      <LoggingMetaData />
      <TaskTracker />
    </ThemeProvider>
  );
}

export default App;
