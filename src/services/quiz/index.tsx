import { child, get, ref, set } from "firebase/database";
import { auth, database } from "../Firebase/firebase";
import { quizDataType } from "./tyles";

export const writeQuizData = async ({title, faculty, subject, timer, showAnswers, questions}:quizDataType) => {
    const id = Date.now();

    return set(ref(database, 'quiz/' + id), {
      id: id,
      date: new Date().toLocaleDateString(),
      title: title,
      faculty: faculty,
      subject : subject,
      timer: timer,
      showAanswers: showAnswers,
      questions: questions,
      author: auth.currentUser?.uid,
      authorName: auth.currentUser?.displayName ? auth.currentUser?.displayName : "Unknown",
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