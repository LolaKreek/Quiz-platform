import { useDispatch, useSelector } from "react-redux";
import {
  deleteNotification,
  selectNotificationStatus,
} from "../../store/Slices/notification";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Notification from "../../components/Notification";
import { Box } from "@mui/material";
import TopUsers from "../../features/dashboard/TopUsers";

const DashboardPage = () => {
  const dispatch = useDispatch();

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
  }, [notification]);

  return (
    <Box className="dashboard__root">
      <TopUsers />
    </Box>
  );
};

export default DashboardPage;
