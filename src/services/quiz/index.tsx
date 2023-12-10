import { ref, set } from "firebase/database";
import { database } from "../Firebase/firebase";
import { quizDataType } from "./tyles";

export const writeQuizData = ({title, faculty, subject, timer, showAnswers}:quizDataType) => {
    const id = Date.now();

    return set(ref(database, 'quiz/' + id), {
      id: id,
      title: title,
      faculty: faculty,
      subject : subject,
      timer: timer,
      showAanswers: showAnswers
    })
}