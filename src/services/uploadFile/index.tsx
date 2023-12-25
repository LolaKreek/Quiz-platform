import { uploadFileDataType } from "./types";
import { firestore, storage } from "../Firebase/firebase";
import { addDoc, collection, where, query, getDocs, deleteDoc, doc } from "firebase/firestore";
import { uploadBytes, ref as storageRef } from "firebase/storage";


export const uploadFileData = async ({title, faculty, subject, file, author, authorName}:uploadFileDataType) => {
    const id = Date.now();
    const date = new Date(id);
    const formattedDate = date.toLocaleString('en-US');


    uploadBytes(storageRef(storage, `instruction/${id}`), file)

    const docRef = await addDoc(collection(firestore, "instruction/"), {
        id: id,
        title: title,
        faculty: faculty,
        subject : subject,
        authorId: author,
        date: formattedDate,
        authorName: authorName
    });


    return docRef
}

//@ts-ignore
export const getMaterialsData = async ({id}) => {
  const q = query(collection(firestore, "instruction"), where("authorId", "==", id));
  //@ts-ignore
  let data = [];

  const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //@ts-ignore
      data = [...data, doc.data()]
    });

  //@ts-ignore
  return data
}

//@ts-ignore
export const getMaterialsAllData = async ({id}) => {
  const q = query(collection(firestore, "instruction"), where("authorId", "!=", id));
  //@ts-ignore
  let data = [];

  const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //@ts-ignore
      data = [...data, doc.data()]
    });

  //@ts-ignore
  return data
}

export const deleteMaterialsData = async (id:any) => {
  const q = query(collection(firestore, "instruction"), where("id", "==", id));
  let ref = '';

  const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //@ts-ignore
      ref = doc._key.path.segments[6]
    });

  await deleteDoc(doc(firestore, "instruction", ref));
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