import React from 'react';
import 'upkit/dist/style.min.css';
import { Routes, Route } from 'react-router-dom';

//state management
import { Provider } from 'react-redux';
import store from './app/store';
import { listen } from './app/listener';

//pages
import Home from './pages/Home';
import Register from './pages/Register';

function App() {
  React.useEffect(() => {
    listen();
  }, []);

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Provider>
  );
}

export default App;
