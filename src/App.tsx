import "./App.css";
import { Box, Typography } from "@mui/material";
import UsersListItem from "./components/UsersListItem/UsersListItem.tsx";
import StandartButton from "./components/StandartButton/StandartButton.tsx";
import { useEffect, useState } from "react";
import AddOrUpdateUserModal from "./components/modals/AddOrUpdateUserModal.tsx";

export type User = {
  id: string;
  name: string;
  age: number;
};

const fetchUsers = async () => {
  try {
    const data = await fetch(
      "http://192.168.32.181:8082/structr/rest/UserType"
    );

    const dataJson = await data.json();
    return dataJson.result;
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = (id: string) => {
  return fetch(`http://192.168.32.181:8082/structr/rest/UserType/${id}`, {
    method: "DELETE",
  });
};

const updateUser = (id: string, body: any) => {
  return fetch(`http://192.168.32.181:8082/structr/rest/UserType/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
};

const createUser = (body: any) => {
  return fetch(`http://192.168.32.181:8082/structr/rest/UserType`, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

function App() {
  const [context, setContext] = useState<{
    mode: "add" | "update" | null;
    node?: User;
  }>({ mode: null });

  const [users, setUsers] = useState<Array<User>>([]);

  async function getUsers() {
    const loadedUsers = await fetchUsers();
    if (loadedUsers) {
      setUsers(loadedUsers);
    }
  }
  useEffect(() => {
    getUsers().then();
  }, []);

  const handleModalClose = () => {
    setContext({ mode: null });
  };

  return (
    <>
      <Typography>Users List</Typography>
      <Box>
        {users.map((user, i) => (
          <UsersListItem
            key={user.name + i}
            user={user}
            onDelete={() => {
              deleteUser(user.id).then(() => fetchUsers());
            }}
            onEdit={() => {
              setContext({ mode: "update", node: user });
            }}
          />
        ))}
      </Box>
      <StandartButton
        onClick={() => {
          setContext({ mode: "add" });
        }}
      >
        Add user
      </StandartButton>
      {context.mode && (
        <AddOrUpdateUserModal
          open={true}
          context={context}
          onClose={handleModalClose}
          onSubmit={(values) => {
            const newVal = {
              name: values.name,
              old: values.age,
            };

            if (context.mode === "add") {
              createUser(newVal)
                .then(() => getUsers())
                .finally(() => handleModalClose());
            } else if (context.mode === "update") {
              updateUser(values.id, newVal)
                .then(() => getUsers())
                .finally(() => handleModalClose());
            }
          }}
        />
      )}
    </>
  );
}

export default App;
