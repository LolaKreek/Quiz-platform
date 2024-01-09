import { Box } from "@mui/material";
import AppTable, { action } from "../../../components/AppTable";
import AppTopMenu from "../../../components/AppTopMenu";
import { studentMenuLinks } from "../constants";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useEffect, useState } from "react";
import { child, get, ref } from "firebase/database";
import { useTableData } from "../../Instruction/constants";
import { database } from "../../../services/Firebase/firebase";
import { quizDataType } from "../../../services/quiz/tyles";
import StudentQuizPassingModal from "./PassingModal/StudentQuizPassingModal";

const StudentQuizAll = () => {
  const { studQuizAllHeaders } = useTableData();

  const [data, setData] = useState(null);
  const [quizes, setQuizes] = useState<{ [id: string]: quizDataType } | null>(
    null
  );

  const [quizPassing, setQuizPassing] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<quizDataType | null>(null);

  const getQuizes = () => {
    const dbRef = ref(database);
    get(child(dbRef, `quiz`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let dataSnapshot = Object.values(snapshot.val());

          dataSnapshot.map((el: any) => {
            el.questions = el.questions.length;
          });
          //   @ts-ignore
          setData(dataSnapshot);
          setQuizes(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getQuizes();
  }, []);

  const actions: action[] = [
    {
      //@ts-ignore
      action: (id) => {
        //@ts-ignore
        setSelectedQuiz(quizes?.[id]);
        setQuizPassing(true);
      },
      icon: <PlayArrowIcon />,
      title: "Start",
    },
  ];

  return (
    <>
      <Box className="top-menu__wrapper">
        <AppTopMenu menuLinks={studentMenuLinks} current="all" type="quiz" />
      </Box>
      <AppTable
        data={data ? data : []}
        headers={studQuizAllHeaders}
        actions={actions}
        type="all"
      ></AppTable>
      {selectedQuiz && quizPassing && (
        <StudentQuizPassingModal
          quiz={selectedQuiz}
          open={quizPassing}
          onClose={() => setQuizPassing(false)}
        />
      )}
    </>
  );
};

export default StudentQuizAll;
