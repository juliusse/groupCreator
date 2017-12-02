import React from 'react';
import PropTypes from 'prop-types';
import './person.less';

export function Person({ name, gender, isGroupLeader }) {
  const firstName = name.substring(0, name.indexOf(' '));
  const lastNameInitial = name[name.lastIndexOf(' ') + 1];
  const displayName = `${firstName} ${lastNameInitial}.`;

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
