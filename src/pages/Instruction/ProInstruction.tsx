import { useState } from "react";
import AppTopMenu from "../../components/AppTopMenu";
import { menuLinks } from "./constants";
import UploadFile from "../../components/UploadFile";

const ProInstructionPage = () => {
    const [open, setOpen] = useState(false);

    const handleUploadFile = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false)
    }

    return(
        <>
            <AppTopMenu menuLinks={menuLinks} current="custom" type="instruction" handleAction={handleUploadFile}/>

            {open && 
                <UploadFile onClose={onClose} open={open}/>
            }
        </>
    )
}

export default ProInstructionPage;