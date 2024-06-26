import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
} from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { Container, Draggable } from "@edorivai/react-smooth-dnd";
import { arrayMoveImmutable } from "array-move";
import { AppInput } from "../../../AppInput";
import AttachButton from "../../../Attach";

const DragNDropAnswer = ({
  set,
  values,
  errors,
}: {
  set: Function;
  values: { [key: string]: { text: string; picture?: { [key: string]: any } } };
  errors: { [key: string]: { text: string; picture?: string } };
  editing: boolean;
}) => {
  const order = ["first", "second", "third", "fourth"];
  const onDrop = ({ removedIndex, addedIndex }: { [key: string]: number }) => {
    let arr = arrayMoveImmutable(
      Object.values(values),
      removedIndex,
      addedIndex
    );
    const newValues: { [key: string]: { text: string } } = {};
    arr.forEach((item, index) => {
      newValues[order[index]] = item;
    });

    set(newValues);
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
                  <Box className="_add-quiz-question__dnd-container">
                    <AppInput
                      error={errors && !!errors[id]}
                      variant="outlined"
                      disabled={!!values[id].picture}
                      value={values[id].text}
                      onChange={(e) => {
                        set({
                          ...values,
                          [id]: { text: e.target.value },
                        });
                      }}
                      className="_add-quiz-question__input"
                    />
                    <AttachButton
                      accept=".png, .jpg, .jpeg"
                      set={(file: File) => {
                        set({
                          ...values,
                          [id]: {
                            ...values[id],
                            picture: file,
                            text: file.name,
                          },
                        })
                      }
                      }
                    />
                  </Box>
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
