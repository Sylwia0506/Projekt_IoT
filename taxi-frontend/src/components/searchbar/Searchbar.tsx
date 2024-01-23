import { Box, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import IconButton from "@mui/material/IconButton"
import React, { useEffect, useState } from "react"

type SearchbarProps = {
  label: string
  searchFunction(arg: string): void
}

const Searchbar = (props: SearchbarProps) => {
  const [searchInput, setSearchInput] = useState("")
  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      props.searchFunction(searchInput)
    }, 200)
    return () => clearTimeout(debounceSearch)
  }, [props, searchInput])

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 0.4,
        gap: 1,
        marginBottom: "1rem",
        marginTop: "0.8rem",
      }}
    >
      <TextField
        value={searchInput}
        sx={{ width: 1 }}
        label={props.label}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchInput(event.target.value)
        }}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() => {
                props.searchFunction(searchInput)
              }}
            >
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </Box>
  )
}

export default Searchbar
