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
}: {
  set: Function;
  values: { [key: string]: string };
}) => {
  useEffect(() => {
    set("answers", {
      first: "1",
      second: "2",
      third: "3",
      fourth: "4",
    });
  }, []);
  const onDrop = ({ removedIndex, addedIndex }: { [key: string]: number }) => {
    let arr = arrayMoveImmutable(
      Object.values(values),
      removedIndex,
      addedIndex
    );
    const newValues: { [key: string]: string } = {};
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
                    error={false}
                    variant="outlined"
                    value={values[id]}
                    onChange={(e) => {
                      set("answers", { ...values, [id]: e.target.value });
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
