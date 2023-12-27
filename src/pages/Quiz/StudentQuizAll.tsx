import { Box } from "@mui/material";
import AppTable, { action } from "../../components/AppTable";
import AppTopMenu from "../../components/AppTopMenu";
import { studentMenuLinks } from "./constants";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useEffect, useState } from "react";
import { child, get, ref } from "firebase/database";
import { useTableData } from "../Instruction/constants";
import { database } from "../../services/Firebase/firebase";

const StudentQuizAll = () => {
    const { studQuizAllHeaders } = useTableData()

    const [data, setData] = useState(null)

    const getQuizes = () => {
        const dbRef = ref(database);
        get(child(dbRef, `quiz`)).then((snapshot) => {
            if (snapshot.exists()) {
              let dataSnapshot = Object.values(snapshot.val())
              
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
    
    const actions: action[] = [
      {
        action: () => {},
        icon: <PlayArrowIcon />,
        title: "Start",
      }
    ]

    return (
        <>
        <Box className="top-menu__wrapper">
            <AppTopMenu menuLinks={studentMenuLinks} current="all" type="quiz" />
        </Box>
            <AppTable data={data ? data : []} headers={studQuizAllHeaders} actions={actions} type="all"></AppTable>
        </>
    )
}

export default StudentQuizAll