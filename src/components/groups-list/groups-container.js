import React from 'react';
import PropTypes from 'prop-types';
import { GroupCard } from './group-card';
import './groups-container.less';

export function GroupsContainer(props) {
  const groupCards = props.groups
    .map(group => <GroupCard key={JSON.stringify(group)} people={group} />);

  return (
    <div className="row groups-container">
      {groupCards}
    </div>
  );
}

GroupsContainer.propTypes = {
  groups: PropTypes.array,
};

GroupsContainer.defaultProps = {
  groups: [],
};

export default {
  GroupsContainer,
};
