import { FC } from "react"
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material"

const Profile: FC = () => {
  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <Paper sx={{ p: 2, m: 2 }}>
        <Stack>
          <Stack direction="row">
            <Avatar variant="rounded" />
            <Stack>
              <Typography component="h1" variant="h4">
                Profil
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}

export default Profile
