import { Box, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import IconButton from "@mui/material/IconButton"

const Searchbar = (label:string) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 0.4,
        gap: 1,
        marginBottom: "1rem",
      }}
    >
      <TextField
        sx={{ width: 1 }}
        label={label}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </Box>
  )
}

export default Searchbar
