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
import IssueDialog from "../../../components/IssueDialog/IssueDialog";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../../store";
import { InstructionIcon } from "../../../assets/icons";
import { useNavigate } from "react-router-dom";

const StudentQuizWrongAnswers = () => {
  const { t } = useTranslation("main");
  

  const { studQuizWrongAnswersHeaders } = useTableData();

  const [data, setData] = useState([]);
  const [quizes, setQuizes] = useState(null);

  const user = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();

  const [quizPassing, setQuizPassing] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<quizDataType | null>(null);

  const getWrongAnswers = () => {
    const dbRef = ref(database);
    get(child(dbRef, `quiz`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const quizes = snapshot.val();
          setQuizes(quizes);
          get(child(dbRef, `student/${user.id}/results`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                let wrongAnswers: any = []
                Object.values(snapshot.val()).map((el: any)=>{
                  Object.entries(el.results).map(([key, value]: any)=>{
                    if (!value) {
                      const question = quizes[el.quiz].questions.filter((question: any) => question.id == key)[0];
                      let wrongAnswer: any = {}
                      wrongAnswer["quiz"] = quizes[el.quiz].title
                      wrongAnswer["id"] = el.quiz
                      wrongAnswer["question"] = question.title
                      wrongAnswer["result"] = `${Math.floor((Object.values(el.results).filter((result: any) => result).length / Object.values(el.results).length)*100)}%`
                      wrongAnswer["correct"] = `${Object.values(el.results).filter((result: any) => result).length} / ${Object.values(el.results).length}`
                      wrongAnswers.push(wrongAnswer)
                    }
                  })
                })
                setData(wrongAnswers.reverse());
              } else {
                console.log("No data available");
              }
            })
      .catch((error) => {
        console.error(error);
      });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      })
  };


  useEffect(() => {
    getWrongAnswers();
  }, []);

  const actions: action[] = [
    {
      //@ts-ignore
      action: (item) => {
        //@ts-ignore
        setSelectedQuiz(quizes?.[item.id]);
        setQuizPassing(true);
      },
      icon: <PlayArrowIcon />,
      title: t('start'),
    },
    {
      //@ts-ignore
      action: (item) => {
        //@ts-ignore
        navigate(`/instruction/${quizes[item.id].subject}`);
      },
      icon: <InstructionIcon />,
      title: t('materials'),
    },
  ];

  return (
    <>
      <Box className="top-menu__wrapper">
        <AppTopMenu menuLinks={studentMenuLinks} current="misstakes" type="quiz" />
      </Box>
      <AppTable
        data={data ? data : []}
        headers={studQuizWrongAnswersHeaders}
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

export default StudentQuizWrongAnswers;
