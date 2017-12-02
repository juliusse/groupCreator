import React from 'react';
import PropTypes from 'prop-types';
import './group-card.less';
import { Person } from '../person';

export function GroupCard(props) {
  const persons = props.people
    .map(person => <Person key={person.name} gender={person.gender} name={person.name} />);

  return (
    <div className="group-card">
      {persons}
    </div>
  );
}

GroupCard.propTypes = {
  people: PropTypes.array,
};

GroupCard.defaultProps = {
  people: [],
};

export default {
  GroupCard,
};
