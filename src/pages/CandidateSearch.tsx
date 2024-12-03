import { useState, useEffect } from 'react';
import { searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

// CandidateSearch component
const CandidateSearch = () => {
  // State to store the current candidate
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  // State to store the list of potential candidates
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>([]);

  // useEffect hook to fetch a candidate when the page loads
  useEffect(() => {
    fetchCandidate();
  }, []);

  // Function to fetch a candidate from the API
  const fetchCandidate = async () => {
    const data = await searchGithubUser('some-username'); // Replace 'some-username' with actual logic to get a username
    setCandidate(data);
  };

  // Function to save the current candidate to the list of potential candidates
  const saveCandidate = () => {
    if (candidate) {
      setPotentialCandidates([...potentialCandidates, candidate]);
      fetchCandidate(); // Fetch the next candidate
    }
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      {candidate ? (
        <div>
          <img src={candidate.avatar_url} alt={candidate.username} />
          <h2>{candidate.name}</h2>
          <p>Username: {candidate.username}</p>
          <p>Location: {candidate.location}</p>
          <p>Email: {candidate.email}</p>
          <p>Company: {candidate.company}</p>
          <a href={candidate.html_url}>GitHub Profile</a>
          <button onClick={saveCandidate}>+</button>
        </div>
      ) : (
        <p>Loading candidate information...</p>
      )}
    </div>
  );
};

export default CandidateSearch;