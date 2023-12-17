import { useState } from "react";
import AppTopMenu from "../../components/AppTopMenu";
import { menuLinks } from "./constants";
import UploadFile from "../../components/UploadFile";
import AppTable from "../../components/AppTable";
import EmptyTable from "../../components/EmptyTable";
import { Box } from "@mui/material";

const ProInstructionPage = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null);

    const handleUploadFile = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false)
    }

    return(
        <>
            <AppTopMenu menuLinks={menuLinks} current="custom" type="instruction" handleAction={handleUploadFile}/>

            {data ? 
                <Box>
                    <AppTable />
                </Box>
                : <EmptyTable />
            }
            

            {open && 
                <UploadFile onClose={onClose} open={open}/>
            }
        </>
    )
}

export default ProInstructionPage;