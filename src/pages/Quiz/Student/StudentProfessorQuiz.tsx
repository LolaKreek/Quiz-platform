import AppTable, { action } from "../../../components/AppTable";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useEffect, useState } from "react";
import { child, get, ref } from "firebase/database";
import { useTableData } from "../../Instruction/constants";
import { database } from "../../../services/Firebase/firebase";
import { quizDataType } from "../../../services/quiz/tyles";
import StudentQuizPassingModal from "./PassingModal/StudentQuizPassingModal";
import IssueDialog from "../../../components/IssueDialog/IssueDialog";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { addFavorite } from "../../../store/Slices/favorites";
import toast from "react-hot-toast";
import Notification from "../../../components/Notification";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const StudentProfessorQuiz = () => {
  const { studQuizAllHeaders } = useTableData();

  const [data, setData] = useState(null);
  const [quizes, setQuizes] = useState<{ [id: string]: quizDataType } | null>(
    null
  );

  const params = useParams();

  const dispatch = useDispatch();

  const [quizPassing, setQuizPassing] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<quizDataType | null>(null);

  const [isIssueDialogOpen, setIssueDialogOpen] = useState(false);

  const { t } = useTranslation("main");

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
          setData(dataSnapshot.reverse().filter((el: any) => {return el.author === params.id}));
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
      action: (item) => {
        //@ts-ignore
        dispatch(addFavorite({ value: item.id, type: "quizes" }));
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
      action: (item) => {
        //@ts-ignore
        const selectedQuiz = quizes?.[item.id];
        setSelectedQuiz(selectedQuiz ?? null);
        setIssueDialogOpen(true);
      },
      icon: <ReportGmailerrorredIcon />,
      title: "Report an issue",
    },
    {
      //@ts-ignore
      action: (item) => {
        //@ts-ignore
        setSelectedQuiz(quizes?.[item.id]);
        setQuizPassing(true);
        setIssueDialogOpen(false);
      },
      icon: <PlayArrowIcon />,
      title: "Start",
    },
  ];

  return (
    <>
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
      {selectedQuiz && isIssueDialogOpen && (
        <IssueDialog
          quiz={selectedQuiz}
          onClose={() => setIssueDialogOpen(false)}
        />
      )}
    </>
  );
};

export default StudentProfessorQuiz;
