import { useDispatch, useSelector } from "react-redux";
import {
  deleteNotification,
  selectNotificationStatus,
} from "../../store/Slices/notification";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Notification from "../../components/Notification";
import { Box, Typography } from "@mui/material";
import TopUsers from "../../features/dashboard/TopUsers";
import ProStatistics from "../../features/dashboard/Professor/Statistics";
import StudStatistics from "../../features/dashboard/Student/Statistics";
import StudActivity from "../../features/dashboard/Student/Activity";
import ProActivity from "../../features/dashboard/Professor/Activity";
import { useNavigate } from "react-router-dom";
import { QuizIcon } from "../../assets/icons";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);

  const roleBasedElements: {[key: string]: {"student": JSX.Element, "professor": JSX.Element}} = {
    statistics: {
      "student": <StudStatistics />,
      "professor": <ProStatistics />
    },
    activity: {
      "student": <StudActivity />,
      "professor": <ProActivity/>,
    }
  }

  const notificationState = useSelector((state: RootState) =>
    selectNotificationStatus(state)
  );
  const notificationHeader = useSelector(
    (state: RootState) => state.notification.header
  );
  const notificationMessage = useSelector(
    (state: RootState) => state.notification.message
  );
  const notificationType = useSelector(
    (state: RootState) => state.notification.type
  );

  const [notification, setNotification] = useState(notificationState);

  const checkNotifications = () => {
    if (notification) {
      setNotification(false);
      dispatch(deleteNotification());
      toast.custom(
        (element) => (
          <Notification
            header={notificationHeader}
            message={notificationMessage}
            element={element}
            type={notificationType}
          />
        ),
        { position: "bottom-center" }
      );
    }
  };

  useEffect(() => {
    checkNotifications();
    console.log("user.role: ", user.role)
  }, [notification]);

  return (
    <Box className="dashboard__root">
      { user.role === "" ?
        <Box>
          <TopUsers />
          
          <Box className="login__dashboard-link">
            <Typography className="login__dashboard-header">
              To see more statistics, please, log in 
              <a className="login__dashboard-a" onClick={() => navigate('/login')}>here</a>
            </Typography>
          </Box>

          <Box className="login__dashboard-main-icon">
            <QuizIcon className="dashboard__icon"/>
          </Box>
        </Box>
        : 
        <Box className="dashboard__container">
          <TopUsers />
          {/* @ts-ignore */}
          {roleBasedElements.statistics[user.role]}
        </Box>
      }

      {/* @ts-ignore */}
      {roleBasedElements.activity[user.role]}
    </Box>
  );
};

export default DashboardPage;
