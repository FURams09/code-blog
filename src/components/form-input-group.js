import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles';

class FormInputGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  handleBlur(e) {
    this.props.updateInput(this.props.id, this.state.value);
  }
  render() {
    let { id, label, icon } = this.props;
    label = label || id;
    return (
      <div style={styles.Form.formGroup}>
        <div style={{ padding: `0 10px`, display: `inline` }}>{icon}</div>
        <input
          type="input"
          id={id}
          placeholder={label}
          onBlur={this.handleBlur.bind(this)}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}

FormInputGroup.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  updateInput: PropTypes.func,
  icon: PropTypes.any, // material-ui name
};

export default FormInputGroup;
