import './App.css'
import {Box, Typography} from '@mui/material';
import UsersListItem from "./components/UsersListItem/UsersListItem.tsx";
import StandartButton from "./components/StandartButton/StandartButton.tsx";
import {useEffect, useState} from "react";
import AddOrUpdateUserModal from "./components/modals/AddOrUpdateUserModal.tsx";

export type User = {
  id: string,
  name: string,
  age: number,
}
const testUsers: Array<User> = [
  {
    id: 'dfvfv234535b',
    name: 'John',
    age: 20,
  },
  {
    id: 'gt4545nio84429',
    name: 'Jill',
    age: 12,
  },
  {
    id: 'ebe5345gdbdb',
    name: 'Adam',
    age: 45,
  },
  {
    id: 'ergddfbxrgsc',
    name: 'Helen',
    age: 34,
  },
]

async function fetchUsers() {
  try{
    const result = await fetch('http://192.168.32.181:8082/structr/rest/UserType', {
      method: 'GET',
      //credentials: 'include'
    });
    const users: Array<User> = (await result.json()).result.forEach(user => {
      users.push({id: user.id, name: user.name, age: user.age})
    });
    return users;
  } catch (error) {
    console.error(error);
  }
}
function App() {
  const [context, setContext] = useState<{mode: 'add' | 'update' | null, node?: User}>({mode: null});
  const [users, setUsers] = useState<Array<User>>([]);
  async function getUsers(){
    const loadedUsers = await fetchUsers();
    if(loadedUsers){
      setUsers(loadedUsers);
    }
  }
  useEffect(() => {
    getUsers().then();
  }, []);

  const handleModalClose = () => {
    setContext({mode: null});
  };

  return (
    <>
      <Typography>Users List</Typography>
      <Box>
        {users.map(user=>
        <UsersListItem user={user} onDelete={()=>{}} onEdit={()=>{setContext({mode: 'update', node: user})}}/>
        )}
      </Box>
      <StandartButton onClick={()=>{setContext({mode: 'add'})}}>Add user</StandartButton>
      {context.mode &&
        <AddOrUpdateUserModal open={true} context={context} onClose={handleModalClose} onSubmit={()=>{}}/>
      }
    </>
  )
}

export default App
