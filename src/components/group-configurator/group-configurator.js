import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import ConfigurationManager from '../../lib/config';
import './group-configurator.less';
import { Select } from '../select/select';

const configs = () => ConfigurationManager.getInstance();

function getPeopleListValue(configKey) {
  const people = configs().has(configKey) ? configs().get(configKey).people : [];
  return people.join('\n');
}

export class GroupConfigurator extends React.Component {
  constructor(props) {
    super(props);

    this.handleCountChange = this.handleCountChange.bind(this);
    this.handleConfigChange = this.handleConfigChange.bind(this);
    this.handlePeopleListChange = this.handlePeopleListChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSubmit = props.onSubmit;

    this.state = {
      groupCount: 6,
      configKey: this.props.defaultConfig,
      peopleList: getPeopleListValue(this.props.defaultConfig),
    };
  }

  handleCountChange(event) {
    this.setState({
      groupCount: event.target.value,
    });
  }

  handleConfigChange({ value: configKey }) {
    this.setState({
      configKey,
      peopleList: getPeopleListValue(configKey),
    });
  }

  handlePeopleListChange(event) {
    const newListValue = event.target.value;
    this.setState({
      peopleList: newListValue,
    });
  }

  handleSubmit() {
    const people = this.state.peopleList
      .split('\n')
      .map(person => person.split(','))
      .map((personProps) => {
        const name = personProps[0].trim();
        const gender = _.get(personProps, '[1]', 'M').trim() === 'M' ? 'male' : 'female';
        return { name, gender };
      });
    const config = configs().get(this.state.configKey);

    this.onSubmit({ config, people, groupCount: this.state.groupCount });
  }

  render() {
    const configOptions = configs()
      .getAvailableConfigurations()
      .map(key => ({ value: key, label: key }));

    return (
      <div>
        <div className="row">
          <div className="column">
            <div className="row">
              <div className="column">
                <div className="m-text">
                  {window.lang.NUM_GROUPS}:
                </div>
              </div>
              <div className="column">
                <input
                  defaultValue={this.state.groupCount}
                  onChange={this.handleCountChange}
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="row">
              <div className="column">
                <div className="m-text">
                  {window.lang.CLASS}:
                </div>
              </div>
              <div className="column">
                <Select
                  rtl
                  value={this.state.configKey}
                  onChange={this.handleConfigChange}
                  options={configOptions}
                />
              </div>
            </div>
            <div className="row">
              <div className="column">
                <textarea
                  className="people-names"
                  value={this.state.peopleList}
                  onChange={this.handlePeopleListChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <div
              role="button"
              tabIndex="0"
              onKeyDown={this.handleSubmit}
              onClick={this.handleSubmit}
              className="m-button-create"
            >
              {window.lang.CREATE_GROUPS}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GroupConfigurator.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultConfig: PropTypes.string,
};

GroupConfigurator.defaultProps = {
  defaultConfig: '',
};

export default {
  GroupConfigurator,
};
