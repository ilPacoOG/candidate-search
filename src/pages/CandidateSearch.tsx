import { useState, useEffect } from 'react';
import { searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

// CandidateSearch component
const CandidateSearch = () => {
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
      const data = await searchGithubUser('some-username'); // Replace 'some-username' with actual logic to get a username
      if (data) {
        setCandidate(data);
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
      fetchCandidate(); 
    }
  };

  // Function to skip current candidate and fetch the next one
  const skipCandidate = () => {
    fetchCandidate();
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      {loading ? (
        <p>Loading candidate information...</p>
      ) : error ? (
        <p>{error}</p>
      ) : candidate ? (
        <div>
          <img src={candidate.avatar_url} alt={candidate.username} />
          <h2>{candidate.name}</h2>
          <p>Username: {candidate.username}</p>
          <p>Location: {candidate.location}</p>
          <p>Email: {candidate.email}</p>
          <p>Company: {candidate.company}</p>
          <a href={candidate.html_url}>GitHub Profile</a>
          <button onClick={saveCandidate}>+</button>
          <button onClick={skipCandidate}>-</button>
        </div>
      ) : (
        <p>No more candidates available</p>
      )}
    </div>
  );
};

export default CandidateSearch;