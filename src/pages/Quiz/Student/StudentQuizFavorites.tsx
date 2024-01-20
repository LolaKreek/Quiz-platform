import { Box } from "@mui/material";
import AppTable from "../../../components/AppTable";
import AppTopMenu from "../../../components/AppTopMenu";
import { useQuizMenuLinks } from "../constants";
import { useEffect, useState } from "react";
import { child, get, ref } from "firebase/database";
import { useTableData } from "../../Instruction/constants";
import { auth, database } from "../../../services/Firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import StudentQuizPassingModal from "./PassingModal/StudentQuizPassingModal";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { removeFavorite } from "../../../store/Slices/favorites";
import toast from "react-hot-toast";
import Notification from "../../../components/Notification";
import { useTranslation } from "react-i18next";

const StudentQuizFavorites = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { studQuizFavoritesHeaders } = useTableData();
  const [data, setData] = useState(null);
  const dispatch = useDispatch(); 
  const {studentMenuLinks} = useQuizMenuLinks()
 
  const { t } = useTranslation("main")

  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [quizPassing, setQuizPassing] = useState(false)
  const [quizes, setQuizes] = useState({})
  const getFavorites = () => {
    const dbRef = ref(database);
    get(child(dbRef, `users/${user.id}/favorites/quizes`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val())
        let dataSnapshot: any = [];
        snapshot.val()
          .reverse()
          .map((el: any) => {
            get(child(dbRef, `quiz/${el}`)).then((snapshot) => {
              let quizSnapshot = snapshot.val();
              setQuizes((prev)=>({...prev, [el]: snapshot.val()}))
              quizSnapshot.questions = quizSnapshot.questions.length;
              // @ts-ignore
              setData((dataSnapshot = [...dataSnapshot, quizSnapshot]));
            });
          });
      } else {
        console.log("No data (user) available");
        // @ts-ignore
        setData([])
      }
    });
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <>
      <Box className="top-menu__wrapper">
        <AppTopMenu
          menuLinks={studentMenuLinks}
          current="favorites"
          type="quiz"
        />
      </Box>
      <AppTable
        data={data ? data : []}
        headers={studQuizFavoritesHeaders}
        actions={[
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
            {
                //@ts-ignore
                action: (id) => {
                  //@ts-ignore
                  dispatch(removeFavorite({value: id, type: "quizes"}))
                  getFavorites()
                  toast.custom(
                    (element) => (
                      <Notification
                        header={t("favoriteQuizHeader")}
                        message={t("removefavoriteQuiz")}
                        element={element}
                        type={"info"}
                      />
                    ),
                    { position: "bottom-center" }
                  );
                },
                icon: <HeartBrokenIcon />,
                title: "Remove",
              },
        ]}
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

export default StudentQuizFavorites;
