import { useEffect, useState } from "react";
import AppTopMenu from "../../components/AppTopMenu";
import { menuLinks, useTableData } from "./constants";
import UploadFile from "../../components/UploadFile";
import AppTable, { action } from "../../components/AppTable";
import EmptyTable from "../../components/EmptyTable";
import { Box } from "@mui/material";
import { deleteMaterialsData, getMaterialsData } from "../../services/uploadFile";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Notification from "../../components/Notification";
import { useTranslation } from "react-i18next";
import DeleteIcon from '@mui/icons-material/Delete';


const ProInstructionPage = () => {
    //@ts-ignore
    const user = useSelector(state => state.auth.user.id)
    const { t } = useTranslation('main')

    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const { instructionHeaders } = useTableData();

    const handleUploadFile = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false)
    }

    const getMaterials = async () => {
        const response = await getMaterialsData({id: user})
        //@ts-ignore
        setData(response)
    }

    const handleDelete = async(item:any) => {
        try{
            await deleteMaterialsData(item.id)
            toast.custom((element) => (
                <Notification header={t('deleteFileActionHeader')} message={t('deleteFileActionMessage')} element={element} type='success' />
            ), {position: "bottom-center"});
        }catch(error){
            console.log(error)
        }
        
    }

    const actions: action[] = [
        {
            title: "Delete",
            action: handleDelete,
            icon: <DeleteIcon/>
        },
    ]

    useEffect(() => {
        getMaterials()
    }, [])

    return(
        <>
            <AppTopMenu menuLinks={menuLinks} current="custom" type="instruction" handleAction={handleUploadFile}/>

            {data ? 
                <Box>
                    <AppTable 
                        data={data} 
                        headers={instructionHeaders} 
                        actions={actions}
                        type="custom"
                    />
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