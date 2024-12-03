// TODO: Create an interface for the Candidate objects returned by the API
export default interface Candidate {
    // needs name, username, location, avatar, email, html_url, and company
    name: string;
    username: string;
    location: string;
    avatar: string;
    email: string;
    html_url: string;
    company: string;
}
