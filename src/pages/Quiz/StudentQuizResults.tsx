import { Box, Typography } from "@mui/material";
import AppTopMenu from "../../components/AppTopMenu";
import { studentMenuLinks } from "./constants";
import { useEffect, useState } from "react";
import { child, get, ref } from "firebase/database";
import { database } from "../../services/Firebase/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { quizDataType } from "../../services/quiz/tyles";
import AppSearch from "../../components/AppSearch";
import { useTranslation } from "react-i18next";

const StudentQuizResults = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const { t } = useTranslation("main");

  const getResults = () => {
    const dbRef = ref(database);
    get(child(dbRef, `student/${user.id}/results`)).then((snapshot) => {
      if (snapshot.exists()) {
        let dataSnapshot: any = [];
        Object.values(snapshot.val()).map((el: any) => {
          get(child(dbRef, `quiz/${el.quiz}`)).then((snapshot) => {
            let quizSnapshot = snapshot.val();
            quizSnapshot.questions = quizSnapshot.questions.length;
            quizSnapshot.elapsed = quizSnapshot.timer ? el.elapsed : "-";
            quizSnapshot.authorName = quizSnapshot.authorName
              ? quizSnapshot.authorName
              : "Unknown";
            quizSnapshot.mark =
              Math.floor(
                (Object.values(el.results).filter((result) => result).length /
                  quizSnapshot.questions) *
                  100
              ) + "%";
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
    getResults();
  }, []);

  return (
    <>
      <Box className="top-menu__wrapper">
        <AppTopMenu
          menuLinks={studentMenuLinks}
          current="results"
          type="quiz"
        />
      </Box>
      <Box className="quiz-results__search">
        <AppSearch
          search={search}
          setSearch={setSearch}
          submit={() => {
            setFilter(search);
          }}
        />
      </Box>
      <Box className="quiz-results__wrapper">
        {data &&
          data
            //@ts-ignore
            .filter((el: any) => {
              return (
                el.title.toLowerCase().includes(filter.toLowerCase()) ||
                el.subject.toLowerCase().includes(filter.toLowerCase()) ||
                el.authorName.toLowerCase().includes(filter.toLowerCase()) ||
                el.elapsed.toLowerCase().includes(filter.toLowerCase()) ||
                el.faculty.toLowerCase().includes(filter.toLowerCase()) ||
                el.questions
                  .toString()
                  .toLowerCase()
                  .includes(filter.toLowerCase()) ||
                el.mark.toLowerCase().includes(filter.toLowerCase())
              );
            })
            .reverse()
            .map((el: quizDataType) => (
              <Box className="quiz-results__item">
                <Box className="quiz-results__info">
                  <Box className="quiz-results__info-section">
                    <Typography className="quiz-results__info-value-sub">
                      {t("menuAllItems.quiz.title")}
                    </Typography>
                    <Typography className="quiz-results__info-value">
                      {el.title}
                    </Typography>
                  </Box>
                  <Box className="quiz-results__info-section">
                    <Typography className="quiz-results__info-value-sub">
                      {t("menuAllItems.quiz.faculty")}
                    </Typography>
                    <Typography className="quiz-results__info-value">
                      {el.faculty}
                    </Typography>
                  </Box>
                  <Box className="quiz-results__info-section">
                    <Typography className="quiz-results__info-value-sub">
                      {t("menuAllItems.quiz.authorName")}
                    </Typography>
                    <Typography className="quiz-results__info-value">
                      {el.authorName}
                    </Typography>
                  </Box>
                  <Box className="quiz-results__info-section">
                    <Typography className="quiz-results__info-value-sub">
                      {t("menuAllItems.quiz.questions")}
                    </Typography>
                    <Typography className="quiz-results__info-value">
                      {/* @ts-ignore */}
                      {el.questions}
                    </Typography>
                  </Box>
                  <Box className="quiz-results__info-section">
                    <Typography className="quiz-results__info-value-sub">
                      {t("menuAllItems.quiz.subject")}
                    </Typography>
                    <Typography className="quiz-results__info-value">
                      {el.subject}
                    </Typography>
                  </Box>
                  {el.timer && (
                    <Box className="quiz-results__info-section">
                      <Typography className="quiz-results__info-value-sub">
                        {t("menuAllItems.quiz.elapsed")}
                      </Typography>
                      <Typography className="quiz-results__info-value">
                        {/* @ts-ignore */}
                        {el.elapsed}
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box className="quiz-results__mark">
                  <Typography variant="h4" className="quiz-results__info-value">
                    {/* @ts-ignore */}
                    {el.mark}
                  </Typography>
                </Box>
              </Box>
            ))}
      </Box>
    </>
  );
};

export default StudentQuizResults;
