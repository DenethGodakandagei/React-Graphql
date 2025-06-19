import "./App.css";
import { useQuery, useMutation, gql } from "@apollo/client";

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

function App() {
  const { data, error, loading } = useQuery(GET_USERS);

  if (loading) return <p>Data loading</p>;

  if (error) return <p>Error :{error.message}</p>;

  return (
    <>
      <div>
        <h1>Users</h1>
        {data.getUsers.map((user) => (
          <div className="flex ">
            <p> Name : {user.name}</p>

          </div>
        ))}
      </div>
    </>
  );
}

export default App;
