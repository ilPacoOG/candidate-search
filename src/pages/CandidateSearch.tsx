import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

// CandidateSearch component
const CandidateSearch = () => {
  // State to store the search input
  const [search, setSearch] = useState<string>('');
  // State to store the list of candidates
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  // useEffect hook to search GitHub when the search input changes
  useEffect(() => {
    if (search.length > 0) {
      searchGithub(search).then((data) => {
        setCandidates(data);
      });
    }
  }, [search]);

  // Handle form submission to search for a GitHub user
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    searchGithubUser(search).then((data) => {
      setCandidates(data);
    });
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a candidate"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.username}>
            <img src={candidate.avatar} alt={candidate.username} />
            <a href={candidate.html_url}>{candidate.name}</a>
            <p>{candidate.location}</p>
            <p>{candidate.email}</p>
            <p>{candidate.company}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateSearch;