  // TODO: Add necessary code to display the navigation bar and link between the pages
   
  import { Link } from 'react-router-dom';

  const Nav = () => {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/PotentialCandidates">Potential Candidates</Link>
          </li>
          <li>
            <Link to="/CandidateSearch">Candidate Search</Link>
          </li>
        </ul>
      </nav>
    );
  };

export default Nav;
