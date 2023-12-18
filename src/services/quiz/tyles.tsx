export type quizDataType = {
    title: string, 
    faculty: string, 
    subject: string, 
    timer: boolean, 
    showAnswers: boolean,
    questions: question[]
}
type question = {    
    id: number,
    title: string,
    type: string,
    answers: {
        [key: string]: {
            text: string,
            isCorrect?: boolean
        }
    },  
}