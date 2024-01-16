import { useEffect, useState } from "react"
import ActivityChart from "../ActivityChart"
import { Database, get, ref } from "firebase/database"
import { useSelector } from "react-redux";
import { database } from "../../../services/Firebase/firebase";
import moment from "moment";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Activity = () => {

    const user = useSelector((state: any) => state.auth.user);
    const [data, setData] = useState<any>(null)

    const { t } = useTranslation("main")

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
                const formateddata = nonformateddata.sort((a: any,b: any) => moment(a.name).format('DD/MM/YYYY') - moment(a.name).format('DD/MM/YYYY'))
                let dataBuild: any = []
                getRange(formateddata[formateddata.length - 1].name).map((el: any) => {
                    dataBuild.push(
                        {
                            name: el.format("DD/MM/YYYY"),
                            Completed: stats[el.format("DD/MM/YYYY")] ? stats[el.format("DD/MM/YYYY")] : 0,
                            amt: 2400
                        }
                    )
                });
                setData(dataBuild.toReversed())

                
            } else {
                setData(null)
            }
        })
        
    }, [])

  return (
    <Box className="activity__root">
        <Typography variant="h5">{t("dashboardStatistics.activity")}</Typography>
        <ActivityChart data={data}/>
    </Box>
  )
}

export default Activity