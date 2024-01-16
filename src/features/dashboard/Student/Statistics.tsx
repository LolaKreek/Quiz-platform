import { Box, Divider, Typography } from "@mui/material"
import { get, ref } from "firebase/database"
import { useEffect, useState } from "react"
import { database, firestore } from "../../../services/Firebase/firebase"
import { useSelector } from "react-redux"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { QuizIcon } from "../../../assets/icons"
import { useTranslation } from "react-i18next"
import { LineChart, Line, XAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import moment from "moment"

const StudStatistics = () => {
    
    const user = useSelector((state: any) => state.auth.user);

    const { t } = useTranslation("main");

    const [stats, setStats] = useState<{[key: string]: number}>({
        totalquizes: 0,
        totalinstructions: 0
    })

    const [data, setData] = useState<any>([])

    function getRange(date: any) {
        let dateMoment = moment(date, "DD/MM/YYYY")
        dateMoment.subtract(30, "d")
        let range = []
        for (let i = 0; i < 30; i++) {
          let dataEl = moment(moment(date, "DD/MM/YYYY"))
          dataEl.subtract(i, "d")
          dataEl.format("DD/MM/YYYY")
          range.push(dataEl)
        }
        return range
      }

    useEffect(() => {
        get(ref(database, "student/" + user.id + "/history")).then((snapshot) => {
            if (snapshot.exists()) {
                setStats((prev) => ({...prev, totalquizes: Object.keys(snapshot.val()).length}))
                let stats: any = {}
                let nonformateddata: any = []
                Object.values(snapshot.val()).map((el: any) => {
                    stats[el.date] = stats[el.date] ? stats[el.date] + 1 : 1
                })
                Object.entries(stats).map(([key, value]) => {
                    nonformateddata = [...nonformateddata, {
                        name: key,
                        Completed: value
                    }]
                })
                //@ts-ignore
                const formateddata = nonformateddata.sort((a: any,b: any) => moment(a.date).format('DD/MM/YYYY') - moment(b.date).format('DD/MM/YYYY'))
                console.log(formateddata)
                let dataBuild: any = []
                getRange(formateddata[formateddata.length - 1].name).map((el: any) => {
                    dataBuild.push(
                        {
                            name: el.format("DD/MM/YYYY"),
                            Completed: stats[el.format("DD/MM/YYYY")] ? stats[el.format("DD/MM/YYYY")] : 0,
                            amt: 2400
                        }
                    )
                    console.log(stats[el.format("DD/MM/YYYY")])
                });
                setData(dataBuild.toReversed())

                
            } else {
                setData(null)
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
        {data && <ResponsiveContainer width="100%" height={230}>
            <LineChart data={data}>
                <XAxis dataKey="name" fontSize={12}/>
                <Tooltip />
                <CartesianGrid stroke="#bbbbff" />
                <Line type="monotone" dataKey="Completed" stroke="#6062FF" yAxisId={0} />
            </LineChart>
        </ResponsiveContainer>}
            
        </Box>
        <QuizIcon className="statistics__icon"/>
    </Box>
  )
}

export default StudStatistics