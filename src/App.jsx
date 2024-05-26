import { Routes, Route } from 'react-router-dom';
import Users from './Users';
import Update from './Update';
// Компоненты для страниц

const App = () => {
  return (
        <Routes>
          <Route path='/' element={<Users />} />
          <Route path='/user/:id' element={<Update />} />
        </Routes>
  );
};

export default App;