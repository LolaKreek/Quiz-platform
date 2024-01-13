import AttachFileIcon from "@mui/icons-material/AttachFile";
import { IconButton, styled } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AttachButton = ({ accept, set }: { accept: string; set: Function }) => {
  return (
    <IconButton component="label" className="add-questions-modal__attach">
      <AttachFileIcon />
      <VisuallyHiddenInput
        type="file"
        accept={accept}
        onChange={(e) => {
          // @ts-ignore
          set(e.target.files[0]);
        }}
      />
    </IconButton>
  );
};

export default AttachButton;
