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
import RegisterSuccess from './pages/RegisterSuccess';
import NotFound from './pages/NotFound';
import Login from './pages/Login';

function App() {
  React.useEffect(() => {
    listen();
  }, []);

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/success" element={<RegisterSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Provider>
  );
}

export default App;
