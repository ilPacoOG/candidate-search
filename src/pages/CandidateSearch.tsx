import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';


// CandidateSearch component
const CandidateSearch = () => {
  // const navigate = useNavigate();
  // State to store the current candidate
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  // State to store the list of potential candidates
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>([]);
  // State to store the loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State to store the error message
  const [error, setError] = useState<string | null>(null);

  // useEffect hook to fetch a candidate when the page loads
  useEffect(() => {
    fetchCandidate();
  }, []);

  // useEffect hook to save potential candidates to local storage when they change
  useEffect(() => {
    localStorage.setItem('potentialCandidates', JSON.stringify(potentialCandidates));
  }, [potentialCandidates]);

  // Function to fetch a candidate from the API
  const fetchCandidate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchGithub();
      if (data.length > 0) {
        const candidateData = await searchGithubUser(data[0].login);
        setCandidate(candidateData);
      } else {
        setError('No more candidates available');
      }
    } catch (err) {
      setError('Failed to fetch candidate');
    } finally {
      setLoading(false);
    }
  };

  // Function to save the current candidate to the list of potential candidates
  const saveCandidate = () => {
    if (candidate) {
      setPotentialCandidates([...potentialCandidates, candidate]);
      fetchCandidate(); // Fetch the next candidate
    }
  };

  // Function to skip the current candidate and fetch the next candidate
  const skipCandidate = () => {
    fetchCandidate(); // Fetch the next candidate
  };

  return (
    <div className="container">
      <h1>Candidate Search</h1>
      {loading ? (
        <p>Loading candidate information...</p>
      ) : error ? (
        <p>{error}</p>
      ) : candidate ? (
        <div className="candidate-card">
          <img src={candidate.avatar_url} alt={candidate.login} />
          <h2>{candidate.name}</h2>
          <p>Username: {candidate.login}</p>
          <p>Location: {candidate.location}</p>
          <p>Email: {candidate.email}</p>
          <p>Company: {candidate.company}</p>
          <a href={candidate.html_url}>GitHub Profile</a>
          <div className="button-container">
            <button className="save" onClick={saveCandidate}>+</button>
            <button className="skip" onClick={skipCandidate}>-</button>
          </div>
        </div>
      ) : (
        <p>No more candidates available</p>
      )}
    </div>
  );
};

export default CandidateSearch;