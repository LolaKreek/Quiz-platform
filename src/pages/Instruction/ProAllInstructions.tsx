import { useEffect, useState } from "react";
import AppTopMenu from "../../components/AppTopMenu";
import { menuLinks, useTableData } from "./constants";
import { Box } from "@mui/material";
import AppTable, { action } from "../../components/AppTable";
import EmptyTable from "../../components/EmptyTable";
import { getMaterialsAllData } from "../../services/uploadFile";
import { useSelector } from "react-redux";
import DownloadIcon from '@mui/icons-material/Download';

const ProAllInstruction = () => {
    const [data, setData] = useState([]);
    const { instructionAllHeaders } = useTableData();

    //@ts-ignore
    const user = useSelector(state => state.auth.user.id)

    const getMaterials = async () => {
        const response = await getMaterialsAllData({id: user})
        //@ts-ignore
        setData(response)
    }


    const handleDownload = (item:any) => {
        console.log("DOWNLOAD: ", item)
    }

    useEffect(() => {
        getMaterials()
    }, [])

    const actions: action[] = [
        {
            title: "Download",
            action: handleDownload,
            icon: <DownloadIcon/>
        }
    ]

    return(
        <>
            <AppTopMenu menuLinks={menuLinks} current="all" type="instruction" />

            {data ? 
                    <Box>
                        <AppTable
                            data={data} 
                            headers={instructionAllHeaders} 
                            actions={actions}
                            type='all'
                        />
                    </Box>
                    : <EmptyTable />
            }
        </>
    )
}

export default ProAllInstruction;