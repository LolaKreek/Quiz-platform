import { Box, Typography } from "@mui/material";
import AppTopMenu from "../../components/AppTopMenu";
import { menuLinks } from "./constants";
import AppTable, { action } from "../../components/AppTable";
import { useEffect, useState } from "react";
import { ref, child, get, remove } from "firebase/database";
import { auth, database } from "../../services/Firebase/firebase";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTableData } from "../Instruction/constants";


const ProQuizPage = () => {

    const handleDelete = async (id: string) => {
        await remove(ref(database, `quiz/${id}`))
        getQuizes()
    }

    const actions: action[] = [
        {action: ()=>{}, icon: <EditIcon />, title: "Edit"},
        {action: handleDelete, icon: <DeleteIcon />, title: "Delete"},
    ]

    const { quizHeaders } = useTableData()

    const [data, setData] = useState(null)

    const getQuizes = () => {
        const dbRef = ref(database);
        get(child(dbRef, `quiz`)).then((snapshot) => {
            if (snapshot.exists()) {
              let dataSnapshot = Object.values(snapshot.val())
              
                dataSnapshot = dataSnapshot.filter((el: any) => {
                    return el.author === auth.currentUser?.uid
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
            <AppTopMenu menuLinks={menuLinks} current="custom" type="quiz" />
        </Box>
            <AppTable data={data ? data : []} headers={quizHeaders} actions={actions} type="custom"></AppTable>
        </>
    )
}

export default ProQuizPage;