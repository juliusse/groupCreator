import React from 'react';
import PropTypes from 'prop-types';
import './group-card.less';
import GroupCard from './group-card';

function GroupsContainer(props) {
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

export default GroupsContainer;
