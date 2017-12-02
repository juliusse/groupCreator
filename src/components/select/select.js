import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';

export function Select({
  value, onChange, options, rtl,
}) {
  return (
    <ReactSelect
      clearable={false}
      searchable={false}
      rtl={rtl}
      value={value}
      onChange={onChange}
      options={options}
    />
  );
}

Select.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  rtl: PropTypes.bool,
};

Select.defaultProps = {
  value: '',
  rtl: false,
};

export default {
  Select,
};
