import React from "react";
import Tabs from '@material-ui/core/Tabs';
import TabLabel from "./TabLabel";
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import { Link } from "react-router-dom";
import Select from "./../MaterialUI/Inputs/Select";
import SelectProps from "./../MaterialUI/Inputs/SelectProps";
import { WatchChildren } from 'react-mutation-observer';
import Icon from "./../MaterialUI/DataDisplay/Icon";
import classNames from "classnames";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    flex: `0 0 ${theme.spacing(1)}`,
    maxHeight: 0,
    padding: `0 0 0 ${theme.spacing(1)}`,
    margin: `0 ${theme.spacing(20)} 0 0`,
    display: "flex",
    alignItems: "flex-end",
    width: `calc(100% - ${theme.spacing(21)})`,
  },
  tab: {
    flex: "0 0 auto"
  },
  tabWrapper: {
    "& > *:first-child": {
      order: "1 !important",
      marginLeft: theme.spacing(1),
      color: theme.palette.primary.contrastText,

      "&:hover": {
        color: theme.palette.primary.main,
      }
    }
  },
  hidden: {
    visibility: "hidden",
    position: "absolute"
  },
  moduleIcon: {
    width: `${theme.spacing(2.4)} !important`,
    height: theme.spacing(2.4),
    color: "inherit"
  },
  select: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  closeIcon: {
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.contrastText,

    "&:hover": {
      color: theme.palette.primary.main,
    }
  },
}));

const ScrollButton = () => {
  const classes = useStyles();

  return <div className={classNames(classes.hidden, "showMore")} />
};

const HiddenTab = () => {
  return <div />
}

const MuiBar = ({ module, pages }) => {
  const classes = useStyles();
  const history = useHistory();
  const activeTabIndex = module.active === true ? 0 : pages.findIndex(p => p.active === true) + 1;
  const [showSelect, setShowSelect] = React.useState(false);

  const handleChange = (_, value) => {
    if (value === 0) {
      history.push(module.href);
    }
    else {
      const href = pages[value - 1].href;
      history.push(href)
    }
  };

  const tabLabels = [];

  const selectProps = new SelectProps();
  selectProps.set(SelectProps.propNames.iconSelect, true);
  selectProps.set(SelectProps.propNames.value, activeTabIndex === 0 ? '' : activeTabIndex);
  selectProps.set(SelectProps.propNames.update, (newValue) => handleChange(null, newValue));

  const select = <div className={classes.select}><Select options={tabLabels} selectProps={selectProps} /></div>;

  const addHandler = (event) => {
    if (event.child.className?.includes("showMore")) {
      setShowSelect(true);
    }
  }

  const removeHandler = (event) => {
    if (event.child.className?.includes("showMore")) {
      setShowSelect(false);
    }
  }

  const tabCloseHandler = (event, closeCallback) => {
    event.stopPropagation();
    event.preventDefault();
    closeCallback();
  };

  const moduleIcon = <Icon id={module.icon} className={classes.moduleIcon} />

  return (
    <div className={classes.container}>
      <Tab
        label={<TabLabel label={module.label} />}
        component={Link}
        key={module.href}
        to={module.href}
        icon={moduleIcon}
        onClick={(e) => handleChange(e, 0)}
        className={activeTabIndex === 0 ? "Mui-selected" : null}
        disableFocusRipple
      />

      <WatchChildren onRemoval={(event) => removeHandler(event)} onAddition={(event) => addHandler(event)}>
        <Tabs
          value={activeTabIndex}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          ScrollButtonComponent={ScrollButton}
        >
          <Tab value={0} component={React.forwardRef((props, ref) => <HiddenTab />)} />
          {
            pages.map(
              ({ href, label, close }, index) => {
                const tabLabel = <TabLabel label={label} />;
                const closeIcon = (
                  <Icon
                    id="close"
                    className={classes.closeIcon}
                    onClick={(event) => tabCloseHandler(event, close)}
                  />
                );
                tabLabels.push({
                  value: index + 1,
                  label: tabLabel,
                  sortOrder: index + 1
                });
                return (
                  <Tab
                    classes={{
                      root: classes.tab,
                    }}
                    component={React.forwardRef((props, ref) => {
                      return (
                        <Link to={props.to} {...props}>
                          {props.children}
                          {closeIcon}
                        </Link>
                      )
                    })}
                    label={tabLabel}
                    key={href}
                    to={href}
                    value={index + 1}
                  />
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