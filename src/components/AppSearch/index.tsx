import { Box, IconButton } from "@mui/material";
import { AppInput } from "../AppInput";
import SearchIcon from "@mui/icons-material/Search";

const AppSearch = ({
  search,
  setSearch,
  submit,
}: {
  search: string;
  setSearch: Function;
  submit: Function;
}) => {
  return (
    <Box className="app-table__search-wrapper">
      <AppInput
        variant="outlined"
        placeholder="Search..."
        className="app-table__search"
        error={false}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onEnter={submit}
      />
      <IconButton
        onClick={() => {
          submit();
        }}
        aria-label="delete"
        size="large"
        className="app-table__search-button"
        sx={{ color: "#6062FF" }}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default AppSearch;
