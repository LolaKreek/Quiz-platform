import { Box, Divider, Typography } from "@mui/material"
import { get, ref } from "firebase/database"
import { useEffect, useState } from "react"
import { database, firestore } from "../../../services/Firebase/firebase"
import { useSelector } from "react-redux"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { QuizIcon } from "../../../assets/icons"
import { useTranslation } from "react-i18next"

const ProStatistics = () => {
    
    const user = useSelector((state: any) => state.auth.user);

    const { t } = useTranslation("main")

    const [stats, setStats] = useState<{[key: string]: number}>({
        totalquizes: 0,
        totalinstructions: 0
    })

    useEffect(() => {
        getDocs(collection(firestore, "instruction")).then((snapshot) => {
            snapshot.forEach((el: any) => {
                el.data().authorId === user.id && setStats((prev) => ({...prev, totalinstructions: prev.totalinstructions + 1}))
            })
        })
        get(ref(database, "quiz")).then((snapshot) => {
            if (snapshot.exists()) {
                setStats((prev) => ({...prev, totalquizes: Object.values(snapshot.val()).filter((el:any)=>{
                    return el.author === user.id
                }).length}))
            } else {
                setStats((prev) => ({...prev, totalquizes: 0}))
            }
        })
        
    }, [])
    
  return (
    <Box className="statistics__root">
        <Typography variant="h5">{t("dashboardStatistics.stats")}</Typography>
        <Box className="statistics__container">
            <Box className="statistics__item">
                <Typography className="statistics__title" variant="h6">{ t("dashboardStatistics.professor.quizesCreated") }</Typography>
                <Typography variant="h4">{stats.totalquizes}</Typography>    
            </Box>
            <Box className="statistics__divider"/>
            <Box className="statistics__item">
                <Typography className="statistics__title" variant="h6">{ t("dashboardStatistics.professor.instructionsCreated") }</Typography>
                <Typography variant="h4">{stats.totalinstructions}</Typography>    
            </Box>
        </Box>
        <QuizIcon className="statistics__icon"/>
    </Box>
  )
}

export default ProStatistics