export type quizDataType = {
    title: string, 
    faculty: string, 
    subject: string, 
    timer: boolean, 
    showAnswers: boolean,
    authorName: string,
    author: string,
    editingId?: string, 
    questions: question[]
}
export type question = {    
    id: number,
    title: string,
    type: string,
    picture: boolean | null,
    answers: {
        [key: string]: {
            text: string,
            isCorrect?: boolean
        }
    },  
}