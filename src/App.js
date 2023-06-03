import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { LinkPage } from './components/LinkPage';
import { Unauthorized } from './components/Unauthorized';
import { Editor } from './components/Editor';
import { Admin } from './components/Admin';
import { Lounge } from './components/Lounge';
import { Missing } from './components/Missing';
import { RequireAuth } from './components/RequireAuth';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='linkpage' element={<LinkPage />} />
          <Route path='unauthorized' element={<Unauthorized />} />

          {/* private */}
          <Route element={<RequireAuth assignedRoles={2023} />}>
            <Route path='/' element={<Home />} />
            <Route path='editor' element={<Editor />} />
            <Route path='admin' element={<Admin />} />
            <Route path='lounge' element={<Lounge />} />
          </Route>

          <Route path='*' element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
