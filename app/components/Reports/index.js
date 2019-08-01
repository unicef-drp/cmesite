import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Wrapper from 'components/Wrapper';
import Report from 'components/Report';
import useStyles from './styles';
import messages from './messages';

const Reports = ({ reports = [], isSecondary }) => {
  const classes = useStyles();

  if (R.isEmpty(reports)) return null;

  return (
    <Wrapper classes={{ root: classes[isSecondary ? 'secondaryWrapper' : 'wrapper'] }}>
      <div className={classes.reports}>
        <Typography variant="h5" align="center" className={classes.typo}>
          <FormattedMessage {...messages.title} />
        </Typography>
        <div className={classes.container}>
          {R.map(
            ({ id, ...report }) => (
              <Report key={id} {...report} isSecondary={isSecondary} />
            ),
            reports,
          )}
        </div>
        {isSecondary && (
          <div className={classes.action}>
            <Button variant="contained" color="primary" component={Link} to={'/reports'}>
              <FormattedMessage {...messages.action} />
            </Button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

Reports.propTypes = {
  reports: PropTypes.array,
  isSecondary: PropTypes.bool,
};

export default Reports;
