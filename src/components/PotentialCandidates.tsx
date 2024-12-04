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

   // Function to remove a candidate from the list
   const removeCandidate = (username: string) => {
    const updatedCandidates = potentialCandidates.filter(candidate => candidate.login !== username);
    setPotentialCandidates(updatedCandidates);
    localStorage.setItem('potentialCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <div className="container">
      <h1>Potential Candidates</h1>
      {potentialCandidates.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Profile</th>
            </tr>
          </thead>
          <tbody>
            {potentialCandidates.map((candidate) => (
              <tr key={candidate.login}>
                <td><img src={candidate.avatar_url} alt={candidate.login} width="50" /></td>
                <td>{candidate.name}</td>
                <td>{candidate.login}</td>
                <td>{candidate.location}</td>
                <td>{candidate.email}</td>
                <td>{candidate.company}</td>
                <td><a href={candidate.html_url}>GitHub Profile</a></td>
                <td><button className="reject" onClick={() => removeCandidate(candidate.login)}>Reject</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No potential candidates available</p>
      )}
    </div>
  );
};

export default PotentialCandidates;