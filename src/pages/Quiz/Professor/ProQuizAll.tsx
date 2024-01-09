import { Box } from "@mui/material"
import AppTopMenu from "../../../components/AppTopMenu"
import { menuLinks } from "../constants";
import { child, get, ref } from "firebase/database";
import { auth, database } from "../../../services/Firebase/firebase";
import AppTable from "../../../components/AppTable";
import { useEffect, useState } from "react";
import { useTableData } from "../../Instruction/constants";

const ProQuizAll = () => {
    const { proQuizAllHeaders } = useTableData()

    const [data, setData] = useState(null)

    const getQuizes = () => {
        const dbRef = ref(database);
        get(child(dbRef, `quiz`)).then((snapshot) => {
            if (snapshot.exists()) {
              let dataSnapshot = Object.values(snapshot.val())
              
                dataSnapshot = dataSnapshot.filter((el: any) => {
                    return el.author !== auth.currentUser?.uid
                })
                dataSnapshot.map((el: any, index)=> {
                    el.questions = el.questions.length
                })
            //   @ts-ignore
              setData(dataSnapshot)
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
    }

    useEffect(() => {
        getQuizes()
    }, [])
    
    return (
        <>
        <Box className="top-menu__wrapper">
            <AppTopMenu menuLinks={menuLinks} current="all" type="quiz" />
        </Box>
            <AppTable data={data ? data : []} headers={proQuizAllHeaders} actions={[]} type="all"></AppTable>
        </>
    )
}

export default ProQuizAll;