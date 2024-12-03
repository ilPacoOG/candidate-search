import { useState, useEffect } from 'react';
import Candidate from '../interfaces/Candidate.interface';

// PotentialCandidates component
const PotentialCandidates = () => {
  // State to store the list of potential candidates
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>([]);

  // useEffect hook to load potential candidates from local storage when the page loads
  useEffect(() => {
    const savedCandidates = localStorage.getItem('potentialCandidates');
    if (savedCandidates) {
      setPotentialCandidates(JSON.parse(savedCandidates));
    }
  }, []);

  return (
    <div>
      <h1>Potential Candidates</h1>
      {potentialCandidates.length > 0 ? (
        <ul>
          {potentialCandidates.map((candidate) => (
            <li key={candidate.username}>
              <img src={candidate.avatar_url} alt={candidate.username} />
              <h2>{candidate.name}</h2>
              <p>Username: {candidate.username}</p>
              <p>Location: {candidate.location}</p>
              <p>Email: {candidate.email}</p>
              <p>Company: {candidate.company}</p>
              <a href={candidate.html_url}>GitHub Profile</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No potential candidates available</p>
      )}
    </div>
  );
};

export default PotentialCandidates;