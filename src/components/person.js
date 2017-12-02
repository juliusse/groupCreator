import React from 'react';
import PropTypes from 'prop-types';
import './person.less';

export function Person({ name, gender }) {
  const firstName = name.substring(0, name.indexOf(' '));
  const lastNameInitial = name[name.lastIndexOf(' ') + 1];
  const displayName = `${firstName} ${lastNameInitial}.`;
  return (
    <div className="person m-text" data-size="small" data-gender={gender}>
      {displayName}
    </div>
  );
}

Person.propTypes = {
  name: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
};

export default {
  Person,
};
