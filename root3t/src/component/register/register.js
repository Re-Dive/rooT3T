import React, { useState } from "react";
import { Box, Button, Card, FormControlLabel, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { NormalIndex, FormationIndex } from "../../constants";

import { IconButtonList, SelectedList } from "../character/iconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#393c40",
    maxWidth: "1000px",
    maxHeight: "500px",
    overflowY: "scroll"
  },
  selected: {
    backgroundColor: "#393c40",
    width: "400px",
    height: "80px",
    padding: "5px 5px",
    margin: "20px 0px 10px 0px",
    borderRadius: "10px"
  },
  buttons: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

// 登録ページ
const Register = () => {
  const classes = useStyles();

  const [isFormation, setIsFormation] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState([]);

  const onReset = () => {
    setSelectedIndex([]);
  };

  const handleChange = () => {
    setIsFormation(!isFormation);
  };

  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={isFormation}
            onChange={handleChange}
            color="secondary"
          />
        }
        label="隊列順"
      />
      <Card
        classes={{
          root: classes.root
        }}
      >
        <IconButtonList
          index={isFormation ? FormationIndex : NormalIndex}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </Card>
      <Box
        display="flex"
        flexDirection="row-reverse"
        classes={{
          root: classes.selected
        }}
      >
        <SelectedList
          index={FormationIndex}
          selectedIndex={selectedIndex}
        />
      </Box>
      <div className={classes.buttons}>
        <Button variant="contained" onClick={() => onReset()}>Reset</Button>
        <Button variant="contained" color="primary">Register</Button>
      </div>
    </>
  );
};

export default Register;
