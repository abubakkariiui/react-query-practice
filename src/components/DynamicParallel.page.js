import React from 'react';
import { useQueries } from 'react-query';

export const DynamicParallelPage = () => {
  const queries = useQueries([
    {
      queryKey: 'colors',
      queryFn: () => fetch('http://localhost:4000/colors').then((response) => response.json())
    },
    {
      queryKey: 'friends',
      queryFn: () => fetch('http://localhost:4000/friends').then((response) => response.json())
    }
  ]);

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const colors = queries[0].data;
  const friends = queries[1].data;

  return (
    <div>
      <h1>Colors</h1>
      <ul>
        {colors.map((color) => (
          <li key={color.id}>{color.label}</li>
        ))}
      </ul>

      <h1>Friends</h1>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>{friend.name}</li>
        ))}
      </ul>
    </div>
  );
};
