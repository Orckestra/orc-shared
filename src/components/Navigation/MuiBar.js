import React, { useState, useRef, useEffect } from "react";
import Tabs from '@material-ui/core/Tabs';

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useIntl } from "react-intl";
import useLabelMessage from "../../hooks/useLabelMessage";
import TabLabel, { labelvalue } from "./TabLabel";
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import { Link } from "react-router-dom";
import Select from "./../MaterialUI/Inputs/Select";
import SelectProps from "./../MaterialUI/Inputs/SelectProps";
import ResizeDetector from "react-resize-detector";
import { WatchChildren } from 'react-mutation-observer';

const useStyles = makeStyles((theme) => ({
  container: {
    flex: "0 0 10px",
    maxHeight: 0,
    padding: "0 0 0 10px",
    margin: "0 200px 0 0",
    display: "flex",
    alignItems: "flex-end",
    width: "calc(100% - 210px)",
  },
  tab: {
    flex: "0 0 auto"
  },
}));

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const Test = () => {
  return <div className="showMore" />;
};

const MuiBar = ({ module, pages }) => {
  const classes = useStyles();


  const [value, setValue] = React.useState(0);
  const [showSelect, setShowSelect] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabLabels = [];

  const selectProps = new SelectProps();
  selectProps.set(SelectProps.propNames.iconSelect, true);
  selectProps.set(SelectProps.propNames.value, value);
  selectProps.set(SelectProps.propNames.update, (newValue) => setValue(newValue));

  const select = <Select options={tabLabels} selectProps={selectProps} />;

  const addHandler = (event) => {
    console.log(event.child);
    if (event.child.className?.includes("showMore")) {
      setShowSelect(true);
    }
  }

  const removeHandler = (event) => {
    if (event.child.className?.includes("showMore")) {
      setShowSelect(false);
    }
  }

  return (
    <div className={classes.container}>
      <Tab label={<TabLabel label={module.label} />} component={Link} key={module.href} to={module.href} />
      <WatchChildren onRemoval={(event) => removeHandler(event)} onAddition={(event) => addHandler(event)}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          ScrollButtonComponent={Test}
        >
          {
            pages.map(
              ({ href, label }, index) => {
                const tabLabel = <Typography><TabLabel label={label} /></Typography>;
                tabLabels.push({
                  value: index,
                  label: <TabLabel label={label} />,
                  sortOrder: index
                });
                return (
                  //<MuiTab label={label} href={href} key={href} index={index} />
                  <Tab className={classes.tab} component={Link} label={tabLabel} key={href} to={href} value={index} />
                )
              }
            )
          }
        </Tabs>
      </WatchChildren>
      {showSelect ? select : null}
    </div>
  );
};

export default MuiBar;