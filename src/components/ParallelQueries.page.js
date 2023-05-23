import { useQuery } from 'react-query';

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const ParallelQueriesPage = () => {
  const colorsQuery = useQuery('colors', () => fetchData('http://localhost:4000/colors'));
  const friendsQuery = useQuery('friends', () => fetchData('http://localhost:4000/friends'));

  if (colorsQuery.isLoading || friendsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (colorsQuery.isError || friendsQuery.isError) {
    return <div>Error fetching data.</div>;
  }

  return (
    <div>
      <h1>Colors:</h1>
      <ul>
        {colorsQuery.data.map((color) => (
          <li key={color.id}>{color.label}</li>
        ))}
      </ul>

      <h1>Friends:</h1>
      <ul>
        {friendsQuery.data.map((friend) => (
          <li key={friend.id}>{friend.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ParallelQueriesPage;
