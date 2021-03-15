import React, { ReactElement, useState } from "react";
import {
  Button,
  Card,
  FormControlLabel,
  Grid,
  Switch,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { characterList, FormationCharacterList } from "../../constants";

import { IconButtonList, SelectedList } from "../character/iconButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#393c40",
      maxWidth: "1000px",
      maxHeight: "500px",
      overflowY: "scroll",
    },
    selected: {
      backgroundColor: "#393c40",
      width: "400px",
      height: "80px",
      padding: "5px 5px",
      margin: "20px 0px 10px 0px",
      borderRadius: "10px",
      textAlign: "right",
    },
    buttons: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);

// 登録ページ
function Register(): ReactElement {
  const classes = useStyles();
  const [isFormation, setIsFormation] = useState<boolean>(false);
  const [selectedList, setSelectedList] = useState<string[]>([]);
  // confirmed List 5体のキャラらクターの並びを保存する
  const [confirmedList, setConfirmedList] = useState<string[][]>([]);

  const onRegister = () => {
    const prev = confirmedList.slice();
    prev.push(selectedList);
    setConfirmedList(prev);
  };

  const onReset = () => {
    setSelectedList([]);
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
      <Grid container spacing={3}>
        <Grid item>
          <Card
            classes={{
              root: classes.root,
            }}
          >
            <IconButtonList
              characterList={
                isFormation ? FormationCharacterList : characterList
              }
              selectedList={selectedList}
              setSelectedList={setSelectedList}
            />
          </Card>
          <Card
            classes={{
              root: classes.selected,
            }}
          >
            <SelectedList
              characterList={FormationCharacterList}
              selectedList={selectedList}
              setSelectedList={setSelectedList}
            />
          </Card>
          <div className={classes.buttons}>
            <Button variant="contained" onClick={() => onReset()}>
              Reset
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onRegister()}
            >
              Register
            </Button>
          </div>
        </Grid>
        {confirmedList.length > 0 &&
          confirmedList.map((item, index) => (
            <Card
              key={index}
              classes={{
                root: classes.selected,
              }}
            >
              <SelectedList
                characterList={FormationCharacterList}
                selectedList={item}
                setSelectedList={setSelectedList}
              />
            </Card>
          ))}
      </Grid>
    </>
  );
}

export default Register;
