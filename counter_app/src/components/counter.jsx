import React, { Component } from "react";

class Counter extends Component {
  styles = {
    fontSize: 20,
    fontWeight: "bold",
  };
  render() {
    return (
      <div className="row">
        <div className="col-1">
          <span style={this.styles} className={this.getBadgeClasses()}>
            {this.formatCount()}
          </span>
        </div>

        <div className="col">
          <button
            onClick={() => this.props.onIncrement(this.props.counter)}
            style={this.styles}
            className="btn btn-secondary btn-sm"
          >
            +
          </button>
          <button
            onClick={() => this.props.onDecrement(this.props.counter)}
            style={this.styles}
            className="btn btn-secondary m-2 btn-sm"
            disabled={this.disableButton()}
          >
            -
          </button>

          <button
            className="btn btn-danger btn"
            onClick={() => this.props.onDelete(this.props.counter.id)}
          >
            X
          </button>
        </div>
      </div>
    );
  }
  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }
  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
  disableButton() {
    return this.props.counter.value === 0 ? "disabled" : "";
  }
}

export default Counter;
