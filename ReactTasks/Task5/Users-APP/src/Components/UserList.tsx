import { Box,Typography} from "@mui/material";
import UserCard from "./UserCard";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
};

type UserListProps = {
  users: User[];
};

function UserList({ users }: UserListProps) {
     if (users.length === 0) {
    return <Typography>No users found</Typography>;
  }
  return (
    <Box>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
        />
      ))}
    </Box>
  );
}

export default UserList;