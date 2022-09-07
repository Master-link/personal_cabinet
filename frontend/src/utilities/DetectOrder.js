import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import * as PropTypes from "prop-types";
import React from "react";
import { useStyles } from "./use-styles";

export const DetectOrder = ({ showSort, order }) => {
  const classes = useStyles();
  return (
    showSort && (
      <>
        {order === "desc" ? (
          <ArrowUpwardIcon className={classes.icon_size} />
        ) : (
          <ArrowDownwardIcon className={classes.icon_size} />
        )}
      </>
    )
  );
};

DetectOrder.propTypes = {
  showSort: PropTypes.bool.isRequired,
  order: PropTypes.string.isRequired,
};
