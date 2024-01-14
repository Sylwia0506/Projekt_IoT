import { FC } from "react"
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material"
import { useAppSelector } from "../../store/hooks.ts"

const Profile: FC = () => {
  const { currentUser } = useAppSelector((state) => state.authReducer)

  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <Paper elevation={0} sx={{ p: 2, m: 2 }}>
        <Stack>
          <Stack direction="row">
            <Avatar variant="rounded" />
            <Stack>
              <Typography component="h1" variant="h4">
                Profil
              </Typography>
            </Stack>
          </Stack>
          <Paper sx={{ m: 2, p: 2 }}>
            <Stack gap={2}>
              <Typography component="h2" variant="h4">
                Informacje
              </Typography>
              <Typography>
                <>
                  <b>Nazwa</b>: {currentUser.name}
                </>
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      </Paper>
    </Box>
  )
}

export default Profile
