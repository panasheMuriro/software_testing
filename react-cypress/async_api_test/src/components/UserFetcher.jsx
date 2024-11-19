import { useState } from "react";

const UserFetcher = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>User Fetcher</h1>
      <button onClick={fetchUser}>Fetch User</button>
      {loading && <p>Loading...</p>}
      {user && (
        <div>
          <p data-testid="username">Name: {user.name}</p>
          <p data-testid="useremail">Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserFetcher;
