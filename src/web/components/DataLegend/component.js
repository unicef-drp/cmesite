import React from 'react';
import PropTypes from 'prop-types';
import { map, values, addIndex } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { symbolGenerator, getSymbolFill } from '../DataChart/utils';

const styles = theme => ({
  wrapper: {
    marginBottom: theme.spacing.unit * 2,
  },
  header: {
    paddingTop: theme.spacing.unit * 1.5,
    paddingBottom: theme.spacing.unit * 1.5,
  },
  content: {
    padding: 0,
  },
  list: {
    width: '100%',
    padding: 0,
  },
  typo: {
    color: theme.palette.primary.dark,
  },
});

const SIZE = 40;

const DataLegend = ({ classes, theme, series }) => (
  <Card square className={classes.wrapper}>
    <CardHeader
      className={classes.header}
      title={
        <Typography className={classes.typo}>
          <FormattedMessage {...messages.title} />
        </Typography>
      }
    />
    <CardContent className={classes.content}>
      <List className={classes.list}>
        {addIndex(map)(({ id, name, type, isEstimate }, index) => {
          const color = isEstimate
            ? theme.palette.primary.main
            : theme.palette.chartColorScale(index);
          return (
            <ListItem key={id} dense button>
              <svg width={SIZE / 2} height={SIZE / 2}>
                <g>
                  <path
                    d={symbolGenerator(SIZE)()}
                    transform={`translate(${SIZE / 4}, ${SIZE / 4})`}
                    stroke={color}
                    fill={getSymbolFill(type, color)}
                  />
                </g>
              </svg>
              <ListItemText primary={`${name} (${type})`} />
            </ListItem>
          );
        }, values(series))}
      </List>
    </CardContent>
  </Card>
);

DataLegend.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  series: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(DataLegend);
