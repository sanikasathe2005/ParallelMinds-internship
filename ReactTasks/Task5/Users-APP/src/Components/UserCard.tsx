import { Card, CardContent, Box, Typography } from "@mui/material";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
};

type UserCardProps = {
  user: User;
};

function UserCard({ user }: UserCardProps) {
  return (
    <Card
      sx={{
        marginBottom: 2,
        borderRadius: 3,
        backgroundColor: "white"
      }}
    >
      <CardContent sx={{ padding: 3 }}>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 2
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#9a3412"
            }}
          >
            {user.name}
          </Typography>
        </Box>

        <Typography
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          Email: {user.email}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          Phone: {user.phone}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          Website: {user.website}
        </Typography>

      </CardContent>
    </Card>
  );
}

export default UserCard;