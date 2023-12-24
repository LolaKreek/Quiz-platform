import { get, onValue, ref } from "firebase/database"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { database } from "../../../../../services/Firebase/firebase"
import QuizModule from "../AddQuizModal"

const EditQuizModule = () => {
  const params = useParams()

  const [data, setData] = useState(null)

  const getQuiz = () => {
    onValue(ref(database, `quiz/${params.id}`), (snapshot) => {
      const data = snapshot.val();
      setData(data)
    });
  }

  useEffect(() => {
    getQuiz()
  }, [])
  

  return (
    <>{ data && 
      <QuizModule editing={true} editingValues={data}/>
    }</>
    
  )
}

export default EditQuizModule