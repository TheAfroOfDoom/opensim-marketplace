import React from "react";
import { Typography, Button, Divider, Paper } from "@material-ui/core";
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
    <div style={{ height: "40vh", overflowY: "scroll" }}>
      <List>
        {props.data.map((obj) => {
          const locX = Math.round(obj.locX * 0.000977 * 4);
          const locY = Math.round(obj.locY * 0.000977 * 4);
          const { sizeX, sizeY } = obj;
          return (
            <ListItem>
              <Paper style={{ width: "100%" }}>
                <div style={{ margin: 10 }}>
                  <ListItemText>{obj.regionName}</ListItemText>
                  <ListItemText>
                    Location: ({locX}, {locY})
                  </ListItemText>
                  <ListItemText>
                    Size: ({sizeX}, {sizeY})
                  </ListItemText>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ float: "right", margin: 5 }}
                    onClick={() => props.shutdown(obj.regionName)}
                  >
                    Shutdown
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ float: "right", margin: 5 }}
                    onClick={() => props.pan(locX, locY)}
                  >
                    View
                  </Button>
                </div>
              </Paper>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
