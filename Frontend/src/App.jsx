import "./App.css";
import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      age
      isMarried
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      name
      age
      isMarried
    }
  }
`;

function App() {
  
  const userId = "1"; 

  const {
    data: getUserByIdData,
    error: getUserByIdError,
    loading: getUserByIdLoading,
  } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId },
    skip: !userId, 
  });

  const {
    data: getUsersData,
    error: getUsersError,
    loading: getUsersLoading,
  } = useQuery(GET_USERS);

  if (getUsersLoading) return <p>Loading users...</p>;
  if (getUsersError) return <p>Error loading users: {getUsersError.message}</p>;

  return (
    <div>
      <h1>Chosen User:</h1>
    {getUserByIdLoading ? (
  <p>Loading selected user...</p>
) : getUserByIdError ? (
  <p>Error loading selected user: {getUserByIdError.message}</p>
) : (
  getUserByIdData?.getUserById && (
    <p>Name: {getUserByIdData.getUserById.name}</p>
  )
)}


      <h1>All Users</h1>
      {getUsersData.getUsers.map((user) => (
        <div className="flex" key={user.id}>
          <p>Name: {user.name}</p>
          {user.id}
        </div>
      ))}
    </div>
  );
}

export default App;
