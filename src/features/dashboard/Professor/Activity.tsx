import { get, ref } from "firebase/database";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { database } from "../../../services/Firebase/firebase";
import { Box, Typography } from "@mui/material";
import ActivityChart from "../ActivityChart";

const ProActivity = () => {
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
        get(ref(database, "quiz")).then((snapshot) => {
            if (snapshot.exists()) {
                let stats: any = {}
                let nonformateddata: any = []
                Object.values(snapshot.val()).map((el: any) => {
                    if (el.author === user.id) {
                        stats[el.date] = stats[el.date] ? stats[el.date] + 1 : 1
                        console.log(el.date)
                    }
                })
                Object.entries(stats).map(([key, value]) => {
                    nonformateddata = [...nonformateddata, {
                        name: key,
                        "Created quizes": value
                    }]
                })
                //@ts-ignore
                const formateddata = nonformateddata.sort((a: any,b: any) => moment(a.name).format('DD/MM/YYYY') - moment(a.name).format('DD/MM/YYYY'))
                let dataBuild: any = []
                getRange(formateddata[formateddata.length - 1].name).map((el: any) => {
                    dataBuild.push(
                        {
                            name: el.format("DD/MM/YYYY"),
                            "Created quizes": stats[el.format("DD/MM/YYYY")] ? stats[el.format("DD/MM/YYYY")] : 0,
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
        <ActivityChart data={data} datakey={"Created quizes"}/>
    </Box>
  )
}

export default ProActivity