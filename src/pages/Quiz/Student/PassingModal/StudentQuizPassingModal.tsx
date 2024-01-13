import {
  Box,
  Divider,
  LinearProgress,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import { quizDataType } from "../../../../services/quiz/tyles";
import { AppButton } from "../../../../components/AppButton";
import { useEffect, useRef, useState } from "react";
import SingleQuestion from "../../AnswerElements/SingleQuestion";
import MultipleQuestion from "../../AnswerElements/MultipleQuestion";
import OpenQuestion from "../../AnswerElements/OpenQuestion";
import DragNDropQuestion from "../../AnswerElements/DragNDropQuestion";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { child, get, ref, set } from "firebase/database";
import { auth, database } from "../../../../services/Firebase/firebase";
import StudentQuizPassingWelcome from "./StudentQuizPassingWelcome";
import StudentQuizPassingFinish from "./StudentQuizPassingFinish";
import StudentQuizPassingFinal from "./StudentQuizPassingFinal";
import emailjs from 'emailjs-com';

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
  const { t } = useTranslation("quiz");

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

  const sendEmail = (
    studentName: string | null | undefined,
    grade: number
  ) => {

    const message : string = `Student ${studentName || t("unknown")} has completed your quiz called ${quiz?.title}. \n Grade: ${grade}`
    console.log(message)
    console.log(quiz?.authorEmail)
    
    emailjs.send('service_14mshir', 'template_289ev8q', { message, recipient_email: quiz?.authorEmail, subject: "Quiz completion"}, 'XM98eZJKtZW0ajxcy')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
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
 
        sendEmail(auth.currentUser?.displayName, reputation)

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

export default StudentQuizPassingModal;
