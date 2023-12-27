import { Box } from "@mui/material";
import AppTable from "../../components/AppTable";
import AppTopMenu from "../../components/AppTopMenu";
import { studentMenuLinks } from "./constants";
import { useEffect, useState } from "react";
import { child, get, ref } from "firebase/database";
import { useTableData } from "../Instruction/constants";
import { database } from "../../services/Firebase/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const StudentQuizHistory = () => {
    const { studQuizHistoryHeaders } = useTableData()
    const user = useSelector((state: RootState) => state.auth.user)
    const [data, setData] = useState([])


    const getHistory = () => {
        const dbRef = ref(database);
        get(child(dbRef, `quiz`)).then((quizSnapshot) => {
            if (quizSnapshot.exists()) {
              let dataSnapshot = Object.values(quizSnapshot.val())
              
                dataSnapshot.map((el: any, index)=> {
                    el.questions = el.questions.length
                })

                const dbRef = ref(database);
                get(child(dbRef, `student/${user.id}/history`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        let dataSnapshot: any = []
                        Object.keys(snapshot.val()).map((key) => {
                            dataSnapshot.push({
                                title: quizSnapshot.val()[key].title,
                                faculty: quizSnapshot.val()[key].faculty,
                                subject: quizSnapshot.val()[key].subject,
                                questions: String(quizSnapshot.val()[key].questions.length),
                                authorName: quizSnapshot.val()[key].authorName,
                                date: quizSnapshot.val()[key].date,
                                completed: snapshot.val()[key],
                            })
                            setData(dataSnapshot)
                        })
                    
                    } else {
                    console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
    }

    useEffect(() => {
        getHistory()
    }, [])


    return (
        <>
        <Box className="top-menu__wrapper">
            <AppTopMenu menuLinks={studentMenuLinks} current="history" type="quiz" />
        </Box>
            <AppTable data={data ? data : []} headers={studQuizHistoryHeaders} actions={[]} type="all"></AppTable>
        </>
    )
}

export default StudentQuizHistory