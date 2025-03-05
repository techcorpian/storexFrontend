import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Login from './components/Login';
import Home from './components/Home';
import Folders from './components/Folders';
import ErrorPage from './components/ErrorPage';
import ProtectedRoute from './shared/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Route>


          {/* Auth Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/folder/:id" element={<Folders />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Route>
        </Routes>

      </Router>
    </Provider>
  );
}

export default App;
