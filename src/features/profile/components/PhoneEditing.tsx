import { Button, Modal, Paper } from "@mui/material";
import "./styles.scss";
import { auth, database } from "../../../services/Firebase/firebase";
import toast from "react-hot-toast";
import Notification from "../../../components/Notification";
import { Formik } from "formik";
import { AppInput } from "../../../components/AppInput";
import { ErrorOverLay } from "../../../components/ErrorOverLay";
import * as Yup from "yup";
import { ref, set } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { updateUser } from "../../../store/Slices/auth";

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(
      /^(?:(?:(?:\+|00)?48)|(?:\(?\+?48\)?)|(?:\(?\+?48\)?)?)?[ -]?[1-9][0-9]{2}[ -]?[0-9]{3}[ -]?[0-9]{3}$/,
      "Invalid phone number"
    )
    .required("Phone number is required"),
});
const PhoneModal = ({ open = true, onClose }: any) => {
  const userState = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ phone: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        if (auth.currentUser) {
          const userRef = ref(database, `users/${auth.currentUser.uid}`);
          set(userRef, {
            phone: values.phone,
          });
          dispatch(
            updateUser({ user: { ...userState, phoneNumber: values.phone } })
          );
          toast.custom(
            (element) => (
              <Notification
                header={"Phone changed!"}
                message={"Your phone has been successfully changed"}
                element={element}
                type={"info"}
              />
            ),
            { position: "bottom-center" }
          );
        }
      }}
      validateOnBlur={false}
      validateOnChange={true}
    >
      {({ errors, values, handleChange, handleSubmit }) => (
        <Modal
          className="profilemodal__modal"
          open={open}
          onClose={onClose}
          closeAfterTransition
        >
          <Paper className="profilemodal__paper papper">
            <AppInput
              id="phone"
              className="input"
              variant="outlined"
              type="phone"
              value={values.phone}
              onChange={(e) => {
                handleChange(e);
              }}
              error={!!errors.phone}
            />

            <Button
              type="submit"
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </Button>
            {errors.phone && <ErrorOverLay>{errors.phone}</ErrorOverLay>}
          </Paper>
        </Modal>
      )}
    </Formik>
  );
};

export default PhoneModal;
