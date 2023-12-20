import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import DownloadIcon from '@mui/icons-material/Download';

type appTablePropsType = {
    data: any,
    headers: any,
    actions?: action[],
    type: 'custom' | 'all'
}

export type action = {
    title: string
    action: Function,
    icon: JSX.Element
}



const AppTable = ({data, headers, actions, type}:appTablePropsType) => {
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
                        {actions && actions.map((action:action) => 
                            
                            <TableCell align="center">{action.title}</TableCell>
                            
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item:any) => (
                        <TableRow key={item.id}>
                            {headers.map((header:{title: string, value: string}) => (
                                <TableCell align="center">{item[header.value]}</TableCell>    
                            ))}
                            {actions && actions.map((action:action) => 
                                    
                                    <TableCell align="center" className="app-table__icon" onClick={()=>{action.action(item.id)}}>
                                        {action.icon}
                                    </TableCell>
                                
                                )}
                            
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