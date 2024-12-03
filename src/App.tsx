import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import CandidateSearch from './pages/CandidateSearch';
import PotentialCandidates from './components/PotentialCandidates'; 

function App() {
  return (
    <Router>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<CandidateSearch />} />
          <Route path="/potential-candidates" element={<PotentialCandidates />} />
        </Routes>        
      </main>
    </Router>
  );
}

export default App;