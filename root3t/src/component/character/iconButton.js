import React, { useState, useEffect } from "react";
import { Avatar, Button, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import MuiAlert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    minWidth: "initial"
  },
  text: {
    padding: "0px",
    margin: "4px"
  },
  selected: {
    padding: "0px",
    margin: "0px"
  },
  icon: {
    opacity: 0.85
  },
  selectedIcon: {
    opacity: 0.85,
    width: "60px",
    height: "60px",
    margin: "10px"
  },
  checked: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
    opacity: 0.5,
    color: "white",
    backgroundColor: "black"
  },
  cancel: {
    position: "absolute",
    top: "-5px",
    left: "55px",
    zIndex: 1,
    opacity: 1,
    color: "gray"
  }
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// 登録画面一覧
export const IconButtonList = ({ index, selectedIndex, setSelectedIndex }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const onClickIcon = (name) => {
    if (selectedIndex && selectedIndex.includes(name)) {
      setSelectedIndex(items => items.filter((item) => item !== name));
    } else {
      if (selectedIndex.length < 5) {
        setSelectedIndex(items => [...items, name]);
      } else {
        setOpen(true);
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {index.map((name, index) => {
        return (
          <Button
            key={index}
            classes={{ root: classes.root, text: classes.text }}
            onClick={() => onClickIcon(name)}
          >
            {selectedIndex && selectedIndex.includes(name) &&
              <CheckCircleIcon
                classes={{ root: classes.checked }}
              />
            }
            <Avatar
              variant="rounded"
              src={`${process.env.PUBLIC_URL}/icon/${name}.png`}
              classes={{ root: classes.icon }}
            />
          </Button>
        );
      })}
      <Snackbar key="5member" open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          5キャラまでの選択でお願いします
        </Alert>
      </Snackbar>
    </>
  );
};

IconButtonList.propTypes = {
  index: PropTypes.array.isRequired,
  selectedIndex: PropTypes.array.isRequired,
  setSelectedIndex: PropTypes.func.isRequired
};

export const SelectedList = ({ index, selectedIndex, setSelectedIndex }) => {
  const classes = useStyles();
  const [sortIndex, setSortIndex] = useState(null);

  const onCancelIcon = (name) => {
    setSelectedIndex(items => items.filter((item) => item !== name));
  };

  useEffect(() => {
    setSortIndex(
      [].concat(selectedIndex)
        .sort((a, b) => index.indexOf(a) > index.indexOf(b) ? 1 : -1)
    );
  }, [selectedIndex]);

  return (
    <>
      {sortIndex && sortIndex.map((name, index) => {
        return (
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
        );
      })}
    </>
  );
};

SelectedList.propTypes = {
  index: PropTypes.array.isRequired,
  selectedIndex: PropTypes.array.isRequired,
  setSelectedIndex: PropTypes.func.isRequired
};