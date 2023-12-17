import { ref, set } from "firebase/database";
import { uploadFileDataType } from "./types";
import { database, firestore } from "../Firebase/firebase";
import { addDoc, collection } from "firebase/firestore";

export const uploadFileData = async ({title, faculty, subject, file, author}:uploadFileDataType) => {
    const id = Date.now();
    const fileData = await convertFileToBase64(file);

    const docRef = await addDoc(collection(firestore, "instruction/"), {
        id: id,
        title: title,
        faculty: faculty,
        subject : subject,
        file: fileData,
        author: author
    });

    const data =  set(ref(database, 'instruction/' + id), {
      id: id,
      title: title,
      faculty: faculty,
      subject : subject,
      file: file,
      author: author
    })

    return {docRef, data}
}

// Function to convert a File to a base64-encoded string
//@ts-ignore
function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        //@ts-ignore
        resolve(event.target.result);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsDataURL(file);
    });
  }