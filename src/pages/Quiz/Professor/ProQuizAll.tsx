import { Box } from "@mui/material"
import AppTopMenu from "../../../components/AppTopMenu"
import { useQuizMenuLinks } from "../constants";
import { child, get, ref } from "firebase/database";
import { auth, database } from "../../../services/Firebase/firebase";
import AppTable, {action} from "../../../components/AppTable";
import { useEffect, useState } from "react";
import { useTableData } from "../../Instruction/constants";
import { quizDataType } from "../../../services/quiz/tyles";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import IssueDialog from "../../../components/IssueDialog/IssueDialog";

const ProQuizAll = () => {
  const { menuLinks } = useQuizMenuLinks();
    const { proQuizAllHeaders } = useTableData()

    const [data, setData] = useState(null)
    const [quizes, setQuizes] = useState<{ [id: string]: quizDataType } | null>(
      null
    );

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
              setData(dataSnapshot.reverse())
              setQuizes(snapshot.val());
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

    const [selectedQuiz, setSelectedQuiz] = useState<quizDataType | null>(null);
    const [isIssueDialogOpen, setIssueDialogOpen] = useState(false);

    const actions: action[] = [
      {
        //@ts-ignore
        action: (id) => {
          //@ts-ignore
          setSelectedQuiz(quizes?.[id]);
          setIssueDialogOpen(true);
        },
        icon: <ReportGmailerrorredIcon />,
        title: "Report an issue",
      },
    ];
    
    return (
        <>
        <Box className="top-menu__wrapper">
            <AppTopMenu menuLinks={menuLinks} current="all" type="quiz" />
        </Box>
            <AppTable data={data ? data : []} headers={proQuizAllHeaders} actions={[]} type="all"></AppTable>
        
        { selectedQuiz  && isIssueDialogOpen && (
          <IssueDialog 
          quiz={selectedQuiz}
          onClose={() => setIssueDialogOpen(false)}/>
        )} 
        </>
    )
}

export default ProQuizAll;