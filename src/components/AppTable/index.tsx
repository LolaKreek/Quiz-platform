import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import AppSearch from "../AppSearch";

type appTablePropsType = {
  data: any;
  headers: any;
  actions?: action[];
  type: "custom" | "all";
  overrideSearch?: string
};

export type action = {
  title: string;
  action: Function;
  icon?: JSX.Element;
  dynamicIcon?: Function;
};

const AppTable = ({ data, headers, actions, type, overrideSearch }: appTablePropsType) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [search, setSearch] = useState(overrideSearch ? overrideSearch : "");
  const [filter, setFilter] = useState("");

  const searchSubmit = () => {
    setFilter(search);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    overrideSearch && setFilter(search);
  })
  return (
    <>
      <Box className="app-table">
        <AppSearch
          setSearch={setSearch}
          search={search}
          submit={searchSubmit}
        />
        <TableContainer component={Paper} className="app-table__table">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {headers.map((item: any) => (
                  <TableCell
                    className="app-table__header-cell"
                    key={item.value}
                  >
                    {item.title}
                  </TableCell>
                ))}
                {actions &&
                  actions.map((action: action) => (
                    <TableCell align="center">{action.title}</TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .filter((item: any) => {
                  let confirmations = false;
                  for (const header of headers) {
                    confirmations =
                      confirmations ||
                      String(item[header.value])
                        .toLowerCase()
                        .includes(filter.toLowerCase());
                  }
                  return confirmations;
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item: any) => (
                  <TableRow key={item.id} sx={{ height: "64px" }}>
                    {headers.map((header: { title: string; value: string }) => (
                      <TableCell align="center">{item[header.value]}</TableCell>
                    ))}
                    {actions &&
                      actions.map((action: action) => (
                        <TableCell
                          align="center"
                          className="app-table__icon"
                          onClick={() => {
                            action.action(item);
                          }}
                        >
                          {/* @ts-ignore */}
                          {action.icon || action.dynamicIcon(item)}
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <TablePagination
        rowsPerPageOptions={[9, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default AppTable;
