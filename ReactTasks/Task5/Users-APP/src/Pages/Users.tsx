import { useEffect, useState } from "react";
import { Container, Box, Typography,TextField } from "@mui/material";
import UserList from "../Components/UserList";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
};

function Users() {
  const [users, setUsers] = useState<User[]>([]); 
  const [loading,setLoading]=useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  
useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      setTimeout(() => {
        setUsers(data);
        setLoading(false);
      }, 1000);
    })
    .catch(() => {
      setError("Something went wrong");
      setLoading(false);
    });
}, []);

 if (loading) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 10 }}>
        <Typography variant="h6">
          Loading users...
        </Typography>
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 10 }}>
        <Typography color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  let filteredUsers = users;

if (search !== "") {
  filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );
}


  return (
    <Container maxWidth="md" sx={{paddingTop: 5, paddingBottom: 5}}>
      <Box sx={{
          backgroundColor:"#fff7ed",
          padding: 4,
          borderRadius: 3
      }}>
        <Typography variant="h4" 
        sx={{
            fontWeight: "bold",
            color: "#ab2f05",
            marginBottom: 1,
            textAlign:"center"
          }}>
          Users App
        </Typography>

        <Typography variant="h6"
        sx={{marginBottom:2,color:"#240d05",  textAlign:"center"}}>
          Total Users: {users.length}
        </Typography>

     <Box
         sx={{
         display: "flex",
         justifyContent: "center",
         marginBottom: 3
          }}
    >
        <TextField label="search users" value={search}
        onChange={(e)=>setSearch(e.target.value)}
        sx={{  width: "70%",
               marginBottom: 3,
               backgroundColor: "#fff7ed",
               "& fieldset": {
              borderRadius: 3
               }
        
         }}

        />
        </Box>

       <UserList users={filteredUsers} />
      </Box>
    </Container>
  );
}

export default Users;