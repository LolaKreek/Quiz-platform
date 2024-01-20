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
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Notification from "../../../components/Notification";
import { useTranslation } from "react-i18next";
import { addFavorite } from "../../../store/Slices/favorites";

const StudentQuizAll = () => {
  const { t } = useTranslation("main");
  

  const { studQuizAllHeaders } = useTableData();

  const [data, setData] = useState(null);
  const [quizes, setQuizes] = useState<{ [id: string]: quizDataType } | null>(
    null
  );

  const dispatch = useDispatch();

  const [quizPassing, setQuizPassing] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<quizDataType | null>(null);

  const [isIssueDialogOpen, setIssueDialogOpen] = useState(false);

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
          setData(dataSnapshot.reverse());
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
        dispatch(addFavorite({value: id, type: "quizes"}))
        toast.custom(
          (element) => (
            <Notification
              header={t("favoriteQuizHeader")}
              message={t("favoriteQuiz")}
              element={element}
              type={"info"}
            />
          ),
          { position: "bottom-center" }
        );
      },
      icon: <FavoriteIcon />,
      title: "Favorite",
    },
    {
      //@ts-ignore
      action: (id) => {
        //@ts-ignore
        setSelectedQuiz(quizes?.[id]);
        setQuizPassing(true);
        setIssueDialogOpen(false);
      },
      icon: <PlayArrowIcon />,
      title: t('start'),
    },
    {
      //@ts-ignore
      action: (id) => {
        //@ts-ignore
        const selectedQuiz = quizes?.[id];
        setSelectedQuiz(selectedQuiz ?? null);
        setIssueDialogOpen(true);
      },
      icon: <ReportGmailerrorredIcon />,
      title: t('reportAnIssue'),
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
      { 
        selectedQuiz  && isIssueDialogOpen && (
          <IssueDialog 
          quiz={selectedQuiz}
          onClose={() => setIssueDialogOpen(false)}/>
        )
      } 
    </>
  );
};

export default StudentQuizAll;
