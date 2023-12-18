import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
} from "@mui/material";
import { useEffect } from "react";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { Container, Draggable } from "@edorivai/react-smooth-dnd";
import { arrayMoveImmutable } from "array-move";
import { AppInput } from "../../../../AppInput";

const DragNDropAnswer = ({
  set,
  values,
  errors
}: {
  set: Function;
  values: { [key: string]: { text: string } };
  errors: { [key: string]: { text: string } };
}) => {
  useEffect(() => {
    set("answers", {
      first: { text: "" },
      second: { text: "" },
      third: { text: "" },
      fourth: { text: "" },
    });
  }, []);
  const onDrop = ({ removedIndex, addedIndex }: { [key: string]: number }) => {
    let arr = arrayMoveImmutable(
      Object.values(values),
      removedIndex,
      addedIndex
    );
    const newValues: { [key: string]: { text: string } } = {};
    arr.forEach((item, index) => {
      newValues[Object.keys(values)[index]] = item;
    });
    set("answers", newValues);
  };

  return (
    <>
      {values && (
        <List>
          <Container
            dragHandleSelector=".drag-handle"
            lockAxis="y"
            //@ts-ignore
            onDrop={onDrop}
          >
            {Object.keys(values).map((id) => (
              // @ts-ignore
              <Draggable key={id}>
                <ListItem style={{ padding: "8px 0px" }}>
                  <AppInput
                    error={errors && !!errors[id]}
                    variant="outlined"
                    value={values[id]["text"]}
                    onChange={(e) => {
                      set("answers", {
                        ...values,
                        [id]: { text: e.target.value },
                      });
                    }}
                    className="_add-quiz-question__input"
                  />
                  <ListItemSecondaryAction className="">
                    <ListItemIcon className="drag-handle _add-quiz-question__secondary">
                      <DragHandleIcon
                        style={{ cursor: "grab", fill: "#6062FF" }}
                      />
                    </ListItemIcon>
                  </ListItemSecondaryAction>
                </ListItem>
              </Draggable>
            ))}
          </Container>
        </List>
      )}
    </>
  );
};

export default DragNDropAnswer;
