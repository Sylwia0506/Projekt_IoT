import { ReactElement } from "react"
import { CircularProgress, Stack } from "@mui/material"

interface LoadingWrapperProps {
  loading: boolean
  children: ReactElement
}

const LoadingWrapper = ({ loading, children }: LoadingWrapperProps) => {
  if (loading) {
    return (
      <Stack
        spacing={2}
        sx={{ p: 2, alignItems: "center", justifyContent: "center" }}
      >
        <CircularProgress />
      </Stack>
    )
  }

  return children
}

export default LoadingWrapper
