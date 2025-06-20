import { useState } from "react";
import "./App.css";
import { useQuery, gql, useMutation } from "@apollo/client";

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

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      id
      name
    }
  }
`;

function App() {
  const [newUser, setNewUser] = useState({});
  const userId = "1";

  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

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

  const handleCreateUser = async () => {
    try {
      await createUser({
        variables: {
          name: newUser.name,
          age: Number(newUser.age),
          isMarried: newUser.isMarried ?? false,
        },
      });
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  if (getUsersLoading) return <p>Loading users...</p>;
  if (getUsersError) return <p>Error loading users: {getUsersError.message}</p>;

  return (
    <div>
      <div>
        <input
          placeholder="Name"
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          placeholder="Age"
          type="number"
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, age: e.target.value }))
          }
        />
        <label>
          <input
            type="checkbox"
            onChange={(e) =>
              setNewUser((prev) => ({
                ...prev,
                isMarried: e.target.checked,
              }))
            }
          />
          Is Married
        </label>
        <button onClick={handleCreateUser}>Create User</button>
      </div>

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
        <div key={user.id}>
          <p>
            Name: {user.name}, Age: {user.age}, Married:{" "}
            {user.isMarried ? "Yes" : "No"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
