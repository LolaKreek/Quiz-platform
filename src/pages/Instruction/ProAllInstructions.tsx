import { useEffect, useState } from "react";
import AppTopMenu from "../../components/AppTopMenu";
import { menuLinks, useTableData } from "./constants";
import { Box } from "@mui/material";
import AppTable, { action } from "../../components/AppTable";
import EmptyTable from "../../components/EmptyTable";
import { getMaterialsAllData } from "../../services/uploadFile";
import { useSelector } from "react-redux";
import DownloadIcon from '@mui/icons-material/Download';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../services/Firebase/firebase";

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


    function downloadURI(uri: string, name: string) {
        let link = document.createElement("a");
        link.download = name + ".pdf";
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

    const handleDownload = (item:any) => {
        getDownloadURL(ref(storage, `instruction/${item}.pdf`)).then((url)=>{
            console.log(1)
            downloadURI(url, item)
            
        })
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