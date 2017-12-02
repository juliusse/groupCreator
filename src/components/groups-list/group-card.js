import React from 'react';
import PropTypes from 'prop-types';
import './group-card.less';
import { Person } from '../person';

export function GroupCard({ people }) {
  people.sort((a, b) => {
    if (a.isGroupLeader) {
      return -1;
    }

    if (b.isGroupLeader) {
      return 1;
    }

    return a.name.localeCompare(b.name);
  });

  const persons = people
    .map(person => (<Person
      key={person.name}
      gender={person.gender}
      name={person.name}
      isGroupLeader={person.isGroupLeader}
    />));

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
