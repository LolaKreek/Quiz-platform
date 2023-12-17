import { ref, set } from "firebase/database";
import { uploadFileDataType } from "./types";
import { database } from "../Firebase/firebase";

export const uploadFileData = async ({title, faculty, subject, file, author}:uploadFileDataType) => {
    const id = Date.now();

    return set(ref(database, 'instruction/' + id), {
      id: id,
      title: title,
      faculty: faculty,
      subject : subject,
      file: file,
      author: author
    })
}