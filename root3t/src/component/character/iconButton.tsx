import React, {
  useState,
  useEffect,
  SyntheticEvent,
  ReactElement,
} from "react";
import {
  Avatar,
  Button,
  Snackbar,
  SnackbarCloseReason,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  root: {
    minWidth: "initial",
  },
  text: {
    padding: "0px",
    margin: "4px",
  },
  selected: {
    padding: "0px",
    margin: "0px",
  },
  icon: {
    opacity: 0.85,
  },
  selectedIcon: {
    opacity: 0.85,
    width: "60px",
    height: "60px",
    margin: "10px",
  },
  checked: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
    opacity: 0.5,
    color: "white",
    backgroundColor: "black",
  },
  cancel: {
    position: "absolute",
    top: "-5px",
    left: "55px",
    zIndex: 1,
    opacity: 1,
    color: "gray",
  },
});

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type Props = {
  characterList: string[];
  selectedList: string[];
  setSelectedList: (list: string[]) => void;
};

// 登録画面一覧
export function IconButtonList({
  characterList,
  selectedList,
  setSelectedList,
}: Props): ReactElement {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const onClickIcon = (name: string) => {
    if (selectedList && selectedList.includes(name)) {
      const filteredList: string[] = selectedList.filter(
        (item) => item !== name
      );
      setSelectedList(filteredList);
    } else if (selectedList.length < 5) {
      const newList: string[] = [...selectedList, name];
      setSelectedList(newList);
    } else {
      setOpen(true);
    }
  };

  const handleClose = (
    event: SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {characterList.map((name: string, index: number) => (
        <Button
          key={index}
          classes={{ root: classes.root, text: classes.text }}
          onClick={() => onClickIcon(name)}
        >
          {selectedList && selectedList.includes(name) && (
            <CheckCircleIcon classes={{ root: classes.checked }} />
          )}
          <Avatar
            variant="rounded"
            src={`${process.env.PUBLIC_URL}/icon/${name}.png`}
            classes={{ root: classes.icon }}
          />
        </Button>
      ))}
      <Snackbar
        key="5member"
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning">
          5キャラまでの選択でお願いします
        </Alert>
      </Snackbar>
    </>
  );
}

export function SelectedList({
  characterList,
  selectedList,
  setSelectedList,
}: Props): ReactElement {
  const classes = useStyles();
  const [sortIndex, setSortIndex] = useState<string[]>([]);

  const onCancelIcon = (name: string) => {
    const filteredList: string[] = selectedList.filter((item) => item !== name);
    setSelectedList(filteredList);
  };

  useEffect(() => {
    const sortedList: string[] = selectedList.sort((a, b) =>
      characterList.indexOf(a) > characterList.indexOf(b) ? -1 : 1
    );
    setSortIndex(sortedList);
  }, [characterList, selectedList]);

  return (
    <>
      {sortIndex &&
        sortIndex.map((name, index) => (
          <Button
            key={index}
            classes={{ root: classes.root, text: classes.selected }}
            onClick={() => onCancelIcon(name)}
          >
            <Avatar
              variant="rounded"
              src={`${process.env.PUBLIC_URL}/icon/${name}.png`}
              classes={{ root: classes.selectedIcon }}
            />
          </Button>
        ))}
    </>
  );
}
