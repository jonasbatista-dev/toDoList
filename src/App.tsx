import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider } from '@/Layout/ThemeContext';
import './App.scss';

import Main from '@/Layout/Main';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Main />
      </Router>
    </ThemeProvider>
  );
};

export default App;
