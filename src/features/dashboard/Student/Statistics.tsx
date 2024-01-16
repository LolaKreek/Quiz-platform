import { Box, Divider, Typography } from "@mui/material"
import { get, ref } from "firebase/database"
import { useEffect, useState } from "react"
import { database, firestore } from "../../../services/Firebase/firebase"
import { useSelector } from "react-redux"
import { QuizIcon } from "../../../assets/icons"
import { useTranslation } from "react-i18next"


const StudStatistics = () => {
    
    const user = useSelector((state: any) => state.auth.user);

    const { t } = useTranslation("main");

    const [stats, setStats] = useState<{[key: string]: number}>({
        totalquizes: 0,
        ranking: 0
    })

    useEffect(() => {
        get(ref(database, "student/" + user.id)).then((snapshot) => {
            if (snapshot.exists()) {
                setStats((prev) => ({...prev, totalquizes: Object.keys(snapshot.val().history).length, ranking: snapshot.val().reputation}))
            
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
                <Typography className="statistics__title" variant="h6">{t("dashboardStatistics.student.quizesCompleted")}</Typography>
                <Typography variant="h4">{stats.totalquizes}</Typography>    
            </Box>
            <Box className="statistics__divider"/>
            <Box className="statistics__item">
                <Typography className="statistics__title" variant="h6">{t("dashboardStatistics.student.ranking")}</Typography>
                <Typography variant="h4">{stats.ranking}</Typography>    
            </Box>
        </Box>
        <QuizIcon className="statistics__icon"/>
    </Box>
  )
}

export default StudStatistics