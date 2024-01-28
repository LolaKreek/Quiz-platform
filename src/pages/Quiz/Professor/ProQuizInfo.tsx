import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useEffect, useState, useTransition } from "react";
import { child, get, ref } from "firebase/database";
import { database } from "../../../services/Firebase/firebase";
import { useTranslation } from "react-i18next";
import { menuLinks } from "../constants";
import AppTopMenu from "../../../components/AppTopMenu";
import { Box, Typography } from "@mui/material";
import AppSearch from "../../../components/AppSearch";
import { quizDataType } from "../../../services/quiz/tyles";
import { useParams } from "react-router-dom";

const ProQuizInfo = () => {
    const [data, setData] = useState(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    
    const params = useParams()

    const { t } = useTranslation("main");
  
    const getResults = async () => {
      const dbRef = ref(database);
      let dataSnapshot: any = []
      let students = (await get(child(dbRef, `student`))).val();

      students = Object.values(students).filter((student: any)=>{
        return Object.values(student.results).filter((result: any)=>{
          return result.quiz == params.id
        }).length > 0
      })

      students.map((student: any)=>{
        student.results = Object.values(student.results).filter((result: any) => result.quiz == params.id)
      })
      
      students.map((student: any)=>{
        student.results.map((result: any)=>{
            let item: any = {}
            item.name = student.info.name ? student.info.name : "Unknown"
            item.email = student.info.email
            item.ranking = student.reputation
            item.correct = `${Object.values(result.results).filter((result: any) => result).length} / ${Object.values(result.results).length}`
            item.mark = `${Math.floor((Object.values(result.results).filter((result: any) => result).length / Object.values(result.results).length)*100)}`
            item.perfect = Object.values(result.results).filter((result: any) => result).length / Object.values(result.results).length == 1
            dataSnapshot.push(item)
        })  
      })
      setData(dataSnapshot)
    };
  
    useEffect(() => {
      getResults();
    }, []);
  
    return (
      <>
        <Box className="quiz-results__search">
          <AppSearch
            search={search}
            setSearch={setSearch}
            submit={() => {
              setFilter(search);
            }}
          />
        </Box>
        <Box className="quiz-results__wrapper">
          {data &&
            data
              //@ts-ignore
              .filter((el: any) => {
                for (const key of Object.values(el)) {
                // @ts-ignore
                  if (key.toString().toLowerCase().includes(filter.toLowerCase())) {
                    return true
                  }
                }
                return false
              })
              .reverse()
              .map((el: any) => (
                // @ts-ignore
                <Box className={el.perfect ? "quiz-results__perfect-item" : "quiz-results__item"}>
                  <Box className="quiz-results__info">
                    <Box className="quiz-results__info-section">
                      {/* @ts-ignore */}
                      <Typography className={ el.perfect ? "quiz-results__info-perfect-value-sub" : "quiz-results__info-value-sub"}>
                        {t("student")}
                      </Typography>
                      <Typography className="quiz-results__info-value">
                        {el.name}
                      </Typography>
                    </Box>
                    <Box className="quiz-results__info-section">
                      {/* @ts-ignore */}
                      <Typography className={ el.perfect ? "quiz-results__info-perfect-value-sub" : "quiz-results__info-value-sub"}>
                      {t("email")}
                      </Typography>
                      <Typography className="quiz-results__info-value">
                        {el.email}
                      </Typography>
                    </Box>
                    <Box className="quiz-results__info-section">
                      {/* @ts-ignore */}
                      <Typography className={ el.perfect ? "quiz-results__info-perfect-value-sub" : "quiz-results__info-value-sub"}>
                      {t("ranking")}
                      </Typography>
                      <Typography className="quiz-results__info-value">
                        {el.ranking}
                      </Typography>
                    </Box>
                    <Box className="quiz-results__info-section">
                      {/* @ts-ignore */}
                      <Typography className={ el.perfect ? "quiz-results__info-perfect-value-sub" : "quiz-results__info-value-sub"}>
                      {t("correct")}
                      </Typography>
                      <Typography className="quiz-results__info-value">
                        {el.correct}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="quiz-results__mark">
                    <Typography variant="h4" className="quiz-results__info-value">
                      {/* @ts-ignore */}
                      {el.mark + "%"}
                    </Typography>
                  </Box>
                </Box>
              ))}
        </Box>
      </>
    );
  };
  


export default ProQuizInfo