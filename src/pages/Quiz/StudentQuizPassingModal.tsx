import {
  Box,
  Divider,
  LinearProgress,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import { quizDataType } from "../../services/quiz/tyles";
import { AppButton } from "../../components/AppButton";
import { useEffect, useRef, useState } from "react";
import SingleQuestion from "./AnswerElements/SingleQuestion";
import MultipleQuestion from "./AnswerElements/MultipleQuestion";
import OpenQuestion from "./AnswerElements/OpenQuestion";
import DragNDropQuestion from "./AnswerElements/DragNDropQuestion";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { child, get, ref, set } from "firebase/database";
import { auth, database } from "../../services/Firebase/firebase";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
const StudentQuizPassingModal = ({
  quiz,
  open,
  onClose,
}: {
  quiz: quizDataType;
  open: boolean;
  onClose: any;
}) => {
  const [timer, setTimer] = useState(null);
  const [elapsed, setElapsed] = useState<any>(0);
  const [currentDate, setCurrentDate] = useState(0);
  const interval = useRef(null);

  useEffect(() => {
    quizBuild();
    if (quiz.timer) {
      // @ts-ignore
      interval.current = setInterval(() => {
        setCurrentDate(Date.now());
      }, 100);
    }
    return () => {
      // @ts-ignore
      if (quiz.timer) clearInterval(interval.current);
    };
  }, []);

  const [active, setActive] = useState(0);
  const [modals, setModals] = useState([
    <StudentQuizPassingWelcome
      next={() => {
        setActive(active + 1);
      }}
      setTimer={setTimer}
      quiz={quiz}
    />,
  ]);
  const [answers, setAnswers] = useState({});

  const questionElements: { [key: string]: (props: any) => JSX.Element } = {
    Single: (props) => <SingleQuestion {...props} />,
    Multiple: (props) => <MultipleQuestion {...props} />,
    Open: (props) => <OpenQuestion {...props} />,
    "Drag & Drop": (props) => <DragNDropQuestion {...props} />,
  };

  const submitQuestion = (
    questionid: any,
    collectedAnswers: any,
    index: number
  ) => {
    setAnswers((oldAnswers) => {
      return { ...oldAnswers, [questionid]: collectedAnswers };
    });
    setActive(index + 2);
  };

  const quizBuild = () => {
    const questions: any[] = [];
    quiz.questions.map((question, index) => {
      questions.push(
        questionElements[question.type]({
          question: question,
          submit: submitQuestion,
          index: index,
          answers: answers,
        })
      );
    });
    setModals([
      ...modals,
      ...questions,
      <StudentQuizPassingFinish
        quiz={quiz}
        setTimer={setTimer}
        setGlobalElapsed={setElapsed}
        finish={() => {
          completeQuiz();
        }}
        timer={timer}
      />,
      <StudentQuizPassingFinal quiz={quiz} onCliose={onClose} />,
    ]);
  };

  const completeQuiz = () => {
    setAnswers((answers) => {
      setElapsed((elapsed: any) => {
        let results: { [id: string]: boolean } = {};
        Object.keys(answers).map((key) => {
          let question = quiz.questions.filter((question) => {
            //@ts-ignore
            return question.id == key;
          })[0];
          //@ts-ignore
          let answer = answers[key];
          if (question.type == "Single") {
            results[key] = answer === "first";
          } else if (question.type == "Multiple") {
            let correct = 0;
            Object.entries(question.answers).map((value) => {
              answer[value[0]] === value[1].isCorrect ? correct++ : correct;
            });
            results[key] = correct === 4;
          } else if (question.type == "Open") {
            results[key] = answer.length > 0 ? true : false;
          } else if (question.type == "Drag & Drop") {
            answer[0][0] === "first" &&
            answer[1][0] === "second" &&
            answer[2][0] === "third" &&
            answer[3][0] === "fourth"
              ? (results[key] = true)
              : (results[key] = false);
          }
        });
        const reputation = Object.values(results).filter((value) => {
          return value === true;
        }).length;
        get(
          child(ref(database), `student/${auth.currentUser?.uid}/reputation`)
        ).then((snapshot) => {
          if (snapshot.exists()) {
            set(
              ref(database, "student/" + auth.currentUser?.uid + "/reputation"),
              snapshot.val() + reputation
            );
          } else {
            set(
              ref(database, "student/" + auth.currentUser?.uid + "/reputation"),
              reputation
            );
          }
        });
        set(
          ref(
            database,
            "student/" + auth.currentUser?.uid + "/results/" + Date.now()
          ),

          {
            //@ts-ignore
            quiz: quiz.id,
            results: results,
            elapsed: quiz.timer ? elapsed : null,
          }
        );
        set(
          ref(
            database,
            "student/" + auth.currentUser?.uid + "/history/" + Date.now()
          ),

          {
            //@ts-ignore
            quiz: quiz.id,
            date: new Date().toLocaleDateString(),
            elapsed: quiz.timer ? elapsed : null,
          }
        );
        set(
          ref(database, "student/" + auth.currentUser?.uid + "/info"),
          //@ts-ignore
          {
            email: auth.currentUser?.email,
            name: auth.currentUser?.displayName,
          }
        );
      });
    });
    setActive((active) => active + 1);
  };

  return (
    <Modal
      className="quiz-passing__modal"
      open={open}
      onClose={onClose}
      closeAfterTransition
    >
      <Paper className="quiz-passing__paper">
        <Box
          className="quiz-passing__top"
          sx={quiz.timer ? {} : { position: "absolute", right: 16 }}
        >
          {timer && (
            <LinearProgress
              variant="determinate"
              value={(active / (modals.length - 2)) * 100}
              className="quiz-passing__progress"
            />
          )}
          {timer && (
            <Box className="quiz-passing__timer">
              {currentDate - timer > 30 * 60 * 1000
                ? "Out of time"
                : (Math.floor((30 * 60 - (currentDate - timer) / 1000) / 60) > 9
                    ? Math.floor((30 * 60 - (currentDate - timer) / 1000) / 60)
                    : "0" +
                      Math.floor(
                        (30 * 60 - (currentDate - timer) / 1000) / 60
                      )) +
                  ":" +
                  (Math.floor((30 * 60 - (currentDate - timer) / 1000) % 60) > 9
                    ? Math.floor((30 * 60 - (currentDate - timer) / 1000) % 60)
                    : "0" +
                      Math.floor(
                        (30 * 60 - (currentDate - timer) / 1000) % 60
                      ))}
            </Box>
          )}
          <CloseIcon className="quiz-passing__close-icon" onClick={onClose} />
        </Box>

        {modals[active]}
      </Paper>
    </Modal>
  );
};
const StudentQuizPassingWelcome = ({
  setTimer,
  quiz,
  next,
}: {
  setTimer: Function;
  quiz: quizDataType;
  next: Function;
}) => {
  const { t } = useTranslation("quiz");
  return (
    <Box>
      <Typography className="quiz-passing__title" variant="h4">
        Welcome
      </Typography>
      <Box className="quiz-passing__welcome-info">
        <Box>
          <Typography className="quiz-passing__sub-title" variant="subtitle2">
            {t("studentTitle")}
          </Typography>
          <Typography>{quiz.title}</Typography>
        </Box>
        <Box>
          <Typography className="quiz-passing__sub-title" variant="subtitle2">
            {t("studentFaculty")}
          </Typography>
          <Typography>{quiz.faculty}</Typography>
        </Box>
        <Box>
          <Typography className="quiz-passing__sub-title" variant="subtitle2">
            {t("studentAuthor")}
          </Typography>
          <Typography>
            {quiz.authorName ? quiz.authorName : "Unknown"}
          </Typography>
        </Box>
        <Box>
          <Typography className="quiz-passing__sub-title" variant="subtitle2">
            {t("studentSubject")}
          </Typography>
          <Typography>{quiz.subject}</Typography>
        </Box>
        <Box>
          <Typography className="quiz-passing__sub-title" variant="subtitle2">
            {t("studentQuestions")}
          </Typography>
          <Typography>{quiz.questions.length}</Typography>
        </Box>
      </Box>
      <Box className="quiz-passing__welcome-divider-container">
        <Divider className="quiz-passing__welcome-divider"></Divider>
      </Box>

      <Box>
        <Typography className="quiz-passing__sub-title" variant="subtitle2">
          {t("studentTimer")}
        </Typography>
        <Typography>{quiz.timer ? "Yes" : "No"}</Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2" className="quiz-passing__sub-title">
          {t("studentAnswers")}
        </Typography>
        <Typography>{quiz.showAnswers ? "Yes" : "No"}</Typography>
      </Box>

      {quiz.timer && (
        <Box className="quiz-passing__attention">
          <PriorityHighIcon
            sx={{ width: "30px", height: "30px", color: "#6062FF" }}
          />
          <Typography>
            This test is time limited! You have 30 minutes to answer all
            questions! If the time runs out before you answer the questions, the
            platform will consider the unanswered questions to be{" "}
            <strong>incorrect</strong>. The countdown will begin after you press
            the START button and proceed to solving the first question.
          </Typography>
        </Box>
      )}
      <AppButton
        className="quiz-passing__welcome-button"
        onClick={() => {
          next();
          quiz.timer && setTimer(Date.now());
        }}
      >
        Start
      </AppButton>
    </Box>
  );
};

const StudentQuizPassingFinish = ({
  quiz,
  finish,
  timer,
  setTimer,
  setGlobalElapsed,
}: {
  quiz: quizDataType;
  finish: Function;
  timer?: number | null;
  setTimer: Function;
  setGlobalElapsed: Function;
}) => {
  function millisecondsToHMS(milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor((seconds % 3600) / 60);
    seconds = seconds % 60;
    return (
      (minutes < 10 ? "0" : "") +
      minutes +
      ":" +
      (seconds < 10 ? "0" : "") +
      seconds
    );
  }

  const [elapsed, setElapsed] = useState<any>(0);

  useEffect(() => {
    //@ts-ignore
    setTimer((startTimer) => {
      if (startTimer) {
        setElapsed(millisecondsToHMS(Date.now() - startTimer));
        setGlobalElapsed(millisecondsToHMS(Date.now() - startTimer));
        return null;
      }
    });
  }, []);

  const { t } = useTranslation("quiz");

  return (
    <Box>
      <Typography className="quiz-passing__title" variant="h4">
        Finishing
      </Typography>
      <Box className="quiz-passing__welcome-info">
        <Box>
          <Typography className="quiz-passing__sub-title" variant="subtitle2">
            {t("studentTitle")}
          </Typography>
          <Typography>{quiz.title}</Typography>
        </Box>
        <Box>
          <Typography className="quiz-passing__sub-title" variant="subtitle2">
            {t("studentFaculty")}
          </Typography>
          <Typography>{quiz.faculty}</Typography>
        </Box>
        <Box>
          <Typography className="quiz-passing__sub-title" variant="subtitle2">
            {t("studentAuthor")}
          </Typography>
          <Typography>
            {quiz.authorName ? quiz.authorName : "Unknown"}
          </Typography>
        </Box>
        <Box>
          <Typography className="quiz-passing__sub-title" variant="subtitle2">
            {t("studentSubject")}
          </Typography>
          <Typography>{quiz.subject}</Typography>
        </Box>
        <Box>
          <Typography className="quiz-passing__sub-title" variant="subtitle2">
            {t("studentQuestions")}
          </Typography>
          <Typography>{quiz.questions.length}</Typography>
        </Box>
        {quiz.timer && (
          <Box>
            <Typography className="quiz-passing__sub-title" variant="subtitle2">
              {t("studentTimer")}
            </Typography>
            <Typography>{elapsed + " / 30:00"}</Typography>
          </Box>
        )}
      </Box>
      <Box className="quiz-passing__welcome-divider-container">
        <Divider className="quiz-passing__welcome-divider"></Divider>
      </Box>
      <AppButton
        onClick={() => {
          finish();
        }}
        className="quiz-passing__welcome-button"
      >
        {t("done")}
      </AppButton>
    </Box>
  );
};

const StudentQuizPassingFinal = ({
  onCliose,
  quiz,
}: {
  onCliose: Function;
  quiz: quizDataType;
}) => {
  const { t } = useTranslation("quiz");

  const [mark, setMark] = useState("Loading...");

  useEffect(() => {
    get(child(ref(database), `student/${auth.currentUser?.uid}/results`)).then(
      (snapshot) => {
        const answers = Object.values(
          //@ts-ignore
          Object.values(snapshot.val())[
            Object.values(snapshot.val()).length - 1
          ].results
        );

        const total = answers.length;

        const corrct = answers.filter((answer: any) => answer).length;
        setMark(`${corrct}/${total}`);
      }
    );
  }, []);

  return (
    <Box>
      <Typography className="quiz-passing__title" variant="h4">
        {t("studentCongratulations")}
      </Typography>
      <Typography className="quiz-passing__title" variant="h5">
        {t("studentScored")}
      </Typography>
      <Typography className="quiz-passing__title" variant="h6">
        {mark}
      </Typography>
      <Box className="quiz-passing__welcome-info">
        <Box>
          <Typography className="quiz-passing__sub-title" variant="subtitle2">
            {t("studentTitle")}
          </Typography>
          <Typography>{quiz.title}</Typography>
        </Box>
        <Box>
          <Typography className="quiz-passing__sub-title" variant="subtitle2">
            {t("studentFaculty")}
          </Typography>
          <Typography>{quiz.faculty}</Typography>
        </Box>
        <Box>
          <Typography className="quiz-passing__sub-title" variant="subtitle2">
            {t("studentAuthor")}
          </Typography>
          <Typography>
            {quiz.authorName ? quiz.authorName : "Unknown"}
          </Typography>
        </Box>
        <Box>
          <Typography className="quiz-passing__sub-title" variant="subtitle2">
            {t("studentSubject")}
          </Typography>
          <Typography>{quiz.subject}</Typography>
        </Box>
        <Box>
          <Typography className="quiz-passing__sub-title" variant="subtitle2">
            {t("studentQuestions")}
          </Typography>
          <Typography>{quiz.questions.length}</Typography>
        </Box>
      </Box>
      {quiz.showAnswers && (
        <>
          <Box className="quiz-passing__welcome-divider-container">
            <Divider className="quiz-passing__welcome-divider"></Divider>
          </Box>
          <AppButton
            variant="outlined"
            className="quiz-passing__answers_button"
            onClick={() => {}}
          >
            See answers
          </AppButton>
        </>
      )}

      <AppButton
        onClick={() => {
          onCliose();
        }}
        className="quiz-passing__welcome-button"
      >
        {t("quit")}
      </AppButton>
    </Box>
  );
};

export default StudentQuizPassingModal;
