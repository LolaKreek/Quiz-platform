import { child, get, ref, set } from "firebase/database";
import { database } from "../Firebase/firebase";
import { quizDataType } from "./tyles";

export const writeQuizData = async ({title, faculty, subject, timer, showAnswers}:quizDataType) => {
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

export const getQuizQuestionTypes = async () => {
  const dbRef = ref(database);

  return get(child(dbRef, 'quizTypes/'))
  .then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}