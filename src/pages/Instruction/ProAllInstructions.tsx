import { useEffect, useState } from "react";
import AppTopMenu from "../../components/AppTopMenu";
import { menuLinks, useTableData } from "./constants";
import { Box } from "@mui/material";
import AppTable from "../../components/AppTable";
import EmptyTable from "../../components/EmptyTable";
import { getMaterialsAllData } from "../../services/uploadFile";
import { useSelector } from "react-redux";

const ProAllInstruction = () => {
    const [data, setData] = useState([]);
    const { menuAllItems } = useTableData();

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

    return(
        <>
            <AppTopMenu menuLinks={menuLinks} current="all" type="instruction" />

            {data ? 
                    <Box>
                        <AppTable
                            data={data} 
                            headers={menuAllItems} 
                            handleDelete={handleDownload}
                            type='all'
                        />
                    </Box>
                    : <EmptyTable />
            }
        </>
    )
}

export default ProAllInstruction;