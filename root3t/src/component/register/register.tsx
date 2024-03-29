import React, { ReactElement, useState } from "react";
import { Button, Card, FormControlLabel, Switch } from "@material-ui/core";
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

type Props = {
  confirmedList: string[][];
  setConfirmedList: (list: string[][]) => void;
};

// 登録ページ
function Register({ confirmedList, setConfirmedList }: Props): ReactElement {
  const classes = useStyles();
  const [isFormation, setIsFormation] = useState<boolean>(false);
  const [selectedList, setSelectedList] = useState<string[]>([]);

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

      <Card
        classes={{
          root: classes.root,
        }}
      >
        <IconButtonList
          characterList={isFormation ? FormationCharacterList : characterList}
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
    </>
  );
}

export default Register;
