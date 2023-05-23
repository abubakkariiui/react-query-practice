import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchUserByEmail = email => {
  return axios.get(`http://localhost:4000/users/${email}`)
}

const fetchCoursesByChannelId = channelId => {
  return axios.get(`http://localhost:4000/channels/${channelId}`)
}

export const DependentQueriesPage = ({ email }) => {
  const { data: user, isLoading: userLoading, isError: userError } = useQuery(
    ['user', email],
    () => fetchUserByEmail(email)
  )
  const channelId = user?.data?.channelId
  const { data: courses, isLoading: coursesLoading, isError: coursesError } = useQuery(
    ['courses', channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId,
      // Refetch the courses when the channelId changes
      refetchOnWindowFocus: false,
    }
  )

  console.log(courses);

  if (userLoading || coursesLoading) {
    return <div>Loading...</div>
  }

  if (userError || coursesError) {
    return <div>Error occurred while fetching data.</div>
  }

  return (
    <div>
      <h1>User Details</h1>
      {user && (
        <div>
          <p>Email: {user.data.id}</p>
          <p>Channel ID: {user.data.channelId}</p>
        </div>
      )}

      <h1>Courses</h1>
      {courses && courses.data && courses.data?.courses ? (
        <ul>
          {courses.data?.courses.map(course => (
            <li key={course}>{course}</li>
          ))}
        </ul>
      ) : (
        <div>No courses found.</div>
      )}
    </div>
  )
}
