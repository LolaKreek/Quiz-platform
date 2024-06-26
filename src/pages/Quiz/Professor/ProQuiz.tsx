import { Box } from "@mui/material";
import AppTopMenu from "../../../components/AppTopMenu";
import { menuLinks } from "../constants";
import AppTable, { action } from "../../../components/AppTable";
import { useEffect, useState } from "react";
import { ref, child, get, remove } from "firebase/database";
import { auth, database } from "../../../services/Firebase/firebase";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTableData } from "../../Instruction/constants";
import { useTranslation } from "react-i18next";
import Notification from "../../../components/Notification";
import toast from "react-hot-toast";
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";

const ProQuizPage = () => {
    const { t } = useTranslation("main")
    const navigate = useNavigate()

    const handleEdit = (id: string) => {
        navigate(`edit/${id}`)
    }

    const handleDelete = async (id: string) => {
        await remove(ref(database, `quiz/${id}`))
        toast.custom((element) => (
            <Notification header={t('deleteQuizActionHeader')} message={t('deleteQuizActionMessage')} element={element} type='success'/>
        ), { position: "bottom-center" })
        getQuizes()
    }

    const actions: action[] = [
        {action: (item: any)=>{handleEdit(item.id)}, icon: <EditIcon />, title: "Edit"},
        {action: (item: any)=>{navigate(`${item.id}`)}, icon: <InfoIcon />, title: "Info"},
        {action: (item: any)=>{handleDelete(item.id)}, icon: <DeleteIcon />, title: "Delete"},
    ]

    const { proQuizHeaders } = useTableData()

    const [data, setData] = useState(null)

    const getQuizes = () => {
        const dbRef = ref(database);
        get(child(dbRef, `quiz`)).then((snapshot) => {
            if (snapshot.exists()) {
              let dataSnapshot = Object.values(snapshot.val())
              
                dataSnapshot = dataSnapshot.filter((el: any) => {
                    return el.author === auth.currentUser?.uid
                })
                dataSnapshot.map((el: any)=> {
                    el.questions = el.questions.length
                })
            //   @ts-ignore
              setData(dataSnapshot.reverse())
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
            <AppTable data={data ? data : []} headers={proQuizHeaders} actions={actions} type="custom"></AppTable>
        </>
    )
}

export default ProQuizPage;