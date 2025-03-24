import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeListPage from './Pages/RecipeListPage';
import RecipeInfoPage from './Pages/RecipeInfoPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeListPage />} />
        <Route path="/recipe/:id" element={<RecipeInfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;