import { child, get, ref, set } from "firebase/database";
import { auth, database, storage } from "../Firebase/firebase";
import { quizDataType } from "./tyles";
import { uploadBytes } from "firebase/storage";
import { ref as storageRef } from "firebase/storage";

export const writeQuizData = async ({
  title,
  faculty,
  subject,
  timer,
  showAnswers,
  questions,
  editingId,
}: quizDataType) => {
  const id = editingId ? editingId : Date.now();
  questions.map((question) => {
    if (question.picture) {
      // @ts-ignore
      uploadBytes(storageRef(storage, `pictures/${question["id"]}`),question.picture);
      // @ts-ignore
      question.picture = question.picture.name;
    }

    Object.entries(question.answers).map(([key, value]) => {
      // @ts-ignore
      if (value.picture && typeof value.picture !== "string") {
        // @ts-ignore
        uploadBytes(storageRef(storage, `pictures/${question["id"]}_${key}`),value.picture);
        // @ts-ignore
        question.answers[key].picture = value.picture.name;
      }
    });
  });

  return set(ref(database, "quiz/" + id), {
    id: id,
    date: new Date().toLocaleDateString(),
    title: title,
    faculty: faculty,
    subject: subject,
    timer: timer,
    showAnswers: showAnswers,
    questions: questions,
    author: auth.currentUser?.uid,
    authorName: auth.currentUser?.displayName
      ? auth.currentUser?.displayName
      : "Unknown",
  });
};

export const getQuizQuestionTypes = async () => {
  const dbRef = ref(database);

  return get(child(dbRef, "quizTypes/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
