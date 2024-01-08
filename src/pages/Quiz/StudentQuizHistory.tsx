import { Box } from "@mui/material";
import AppTable from "../../components/AppTable";
import AppTopMenu from "../../components/AppTopMenu";
import { studentMenuLinks } from "./constants";
import { useEffect, useState } from "react";
import { child, get, ref } from "firebase/database";
import { useTableData } from "../Instruction/constants";
import { auth, database } from "../../services/Firebase/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const StudentQuizHistory = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { studQuizHistoryHeaders } = useTableData();
  const [data, setData] = useState(null);

  const getHistory = () => {
    const dbRef = ref(database);
    get(child(dbRef, `student/${user.id}/history`)).then((snapshot) => {
      if (snapshot.exists()) {
        let dataSnapshot: any = [];
        Object.values(snapshot.val())
          .reverse()
          .map((el: any) => {
            get(child(dbRef, `quiz/${el.quiz}`)).then((snapshot) => {
              let quizSnapshot = snapshot.val();
              quizSnapshot.questions = quizSnapshot.questions.length;
              quizSnapshot.completed = el.date;
              quizSnapshot.elapsed = el.elapsed ? el.elapsed : "-";
              // @ts-ignore
              setData((dataSnapshot = [...dataSnapshot, quizSnapshot]));
            });
          });
      } else {
        console.log("No data (user) available");
      }
    });
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <>
      <Box className="top-menu__wrapper">
        <AppTopMenu
          menuLinks={studentMenuLinks}
          current="history"
          type="quiz"
        />
      </Box>
      <AppTable
        data={data ? data : []}
        headers={studQuizHistoryHeaders}
        actions={[]}
        type="all"
      ></AppTable>
    </>
  );
};

export default StudentQuizHistory;
