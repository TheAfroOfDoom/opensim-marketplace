import React from "react";
import { Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  title: {
    color: "white",
    textAlign: "center",
  },
});

export default function RegionInformation(props) {
  return (
    <div>
      <List>
        {props.data.map((obj) => {
          return (
            <ListItem>
              <ListItemText>{obj.regionName}</ListItemText>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
