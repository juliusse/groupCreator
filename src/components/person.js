import React from 'react';
import PropTypes from 'prop-types';
import './person.less';

function Person(props) {
  return (
    <div className="person" data-gender={props.gender}>
      {props.name}
    </div>
  );
}

Person.propTypes = {
  name: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
};

export default Person;
