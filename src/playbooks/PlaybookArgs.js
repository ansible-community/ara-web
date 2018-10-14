import React, { Component } from "react";
import { OverlayTrigger, Tooltip, Icon } from "patternfly-react";

export class ParamatersHelpIcon extends Component {
  render() {
    return (
      <span style={{ float: "right" }}>
        <OverlayTrigger
          overlay={
            <Tooltip id="tooltip">
              <div>
                <h3>Tips: Arguments</h3>
                <hr />
                <p>
                  This panel contains all the arguments and options passed to
                  the ansible-playbook command.
                </p>
                <p>
                  You can control which arguments ARA should ignore with the{" "}
                  <code>ignored_arguments</code> configuration.
                </p>
              </div>
            </Tooltip>
          }
          placement="bottom"
        >
          <Icon name="question-circle" />
        </OverlayTrigger>
      </span>
    );
  }
}

export default class PlaybookArgs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  _renderArg = arg => {
    if (arg instanceof Array) {
      return arg.join(", ");
    } else {
      return arg;
    }
  };

  render() {
    const { playbook } = this.props;
    const { search } = this.state;
    const args = Object.keys(playbook.arguments);
    const filteredArgs = args.filter(
      arg => arg.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
    console.log(search);
    return (
      <div className="table-response">
        <div className="dataTables_header">
          <div className="dataTables_filter">
            <input
              className="form-control"
              placeholder="Search an argument"
              type="search"
              value={search}
              onChange={e => this.setState({ search: e.target.value })}
            />
          </div>
          <div className="dataTables_info">
            Showing <b>{filteredArgs.length}</b> of{" "}
            <b>{args.length}</b> args
            <ParamatersHelpIcon />
          </div>
        </div>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Argument</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {filteredArgs.map((arg, i) => (
              <tr key={i}>
                <td>{arg}</td>
                <td>{this._renderArg(playbook.arguments[arg])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
