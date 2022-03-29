import './App.css';
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import Signin from './views/Signin';
import Signup from './views/Signup';
import Messenger from './views/Messenger';
import { Provider } from 'react-redux';
import store from './state/store';
import jwt_decode from "jwt-decode";
function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/messenger" element={
          <RequireAuth>
            <Messenger />
          </RequireAuth>
        } />
      </Routes>
    </Provider>

  );
}


function RequireAuth({ children }) {
  try {
    let access = localStorage.access ? jwt_decode(localStorage.access) : false;
    return access ? (access.sub.match(/^[0-9a-fA-F]{24}$/) ? (children) : (<Navigate to="/signin" replace />)) : (<Navigate to="/signin" replace />);
  } catch (error) {
    return <Navigate to="/signin" replace />;
  }

}

export default App;
