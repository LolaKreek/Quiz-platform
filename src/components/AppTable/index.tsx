import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import DownloadIcon from '@mui/icons-material/Download';

type appTablePropsType = {
    data: any,
    headers: any,
    handleDelete: any,
    type: 'custom' | 'all'
}

const AppTable = ({data, headers, handleDelete, type}:appTablePropsType) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(9);
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    return(
        <>
        <Box className="app-table">
            <TableContainer component={Paper} className="app-table__table">
                <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headers.map((item:any) => (
                            <TableCell className="app-table__header-cell" key={item.value}>{item.title}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item:any) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.faculty}</TableCell>
                            <TableCell>{item.subject}</TableCell>
                            <TableCell>{item.date}</TableCell>
                            {type === "all" && <TableCell>{item.authorName}</TableCell>}
                            <TableCell>
                                {type === 'custom' ? 
                                    <DeleteIcon className="app-table__delete-icon" onClick={() => handleDelete(item)} />
                                    : <DownloadIcon className="app-table__delete-icon" onClick={() => handleDelete(item)} />
                                }
                            </TableCell>
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
    )
}

export default AppTable