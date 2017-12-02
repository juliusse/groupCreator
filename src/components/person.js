import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './person.less';

function getLastNameInitials(lastName) {
  if (_.isEmpty(lastName)) {
    return '';
  }

  return lastName
    .split('-')
    .map(part => `${part[0]}.`)
    .join('-');
}

export function Person({ name, gender, isGroupLeader }) {
  const nameParts = name.split(' ');

  const firstName = _.first(nameParts);
  const lastName = nameParts.length > 1 ? _.last(nameParts) : '';
  const displayName = `${firstName} ${getLastNameInitials(lastName)}`;

  return (
    <div className="person" data-gender={gender}>
      <div className="m-text" data-size="small">{displayName}</div>
      {isGroupLeader === true &&
      <div className="group-leader icon group" aria-hidden="true" />
      }
    </div>
  );
}

Person.propTypes = {
  name: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  isGroupLeader: PropTypes.bool,
};

Person.defaultProps = {
  isGroupLeader: false,
};
export default {
  Person,
};
