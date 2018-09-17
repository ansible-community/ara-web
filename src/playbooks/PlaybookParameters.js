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
                <h3>Tips: Parameters</h3>
                <hr />
                <p>
                  This panel contains all the parameters and options passed to
                  the ansible-playbook command.
                </p>
                <p>
                  You can control which parameters ARA should ignore with the{" "}
                  <code>ARA_IGNORE_PARAMETERS</code> configuration.
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

export default class PlaybookParameters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  _renderParameter = parameter => {
    if (parameter instanceof Array) {
      return parameter.join(", ");
    } else {
      return parameter;
    }
  };

  render() {
    const { playbook } = this.props;
    const { search } = this.state;
    const parameters = Object.keys(playbook.parameters);
    const filteredParameters = parameters.filter(
      parameter => parameter.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
    console.log(search);
    return (
      <div className="table-response">
        <div className="dataTables_header">
          <div className="dataTables_filter">
            <input
              className="form-control"
              placeholder="Search a parameter"
              type="search"
              value={search}
              onChange={e => this.setState({ search: e.target.value })}
            />
          </div>
          <div className="dataTables_info">
            Showing <b>{filteredParameters.length}</b> of{" "}
            <b>{parameters.length}</b> parameters
            <ParamatersHelpIcon />
          </div>
        </div>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {filteredParameters.map((parameter, i) => (
              <tr key={i}>
                <td>{parameter}</td>
                <td>{this._renderParameter(playbook.parameters[parameter])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
