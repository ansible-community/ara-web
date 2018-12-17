import React, { Component } from "react";
import { OverlayTrigger, Tooltip, Icon } from "patternfly-react";

export class HostsHelpIcon extends Component {
  render() {
    return (
      <span style={{ float: "right" }}>
        <OverlayTrigger
          overlay={
            <Tooltip id="tooltip">
              <div>
                <h3>Tips: Hosts</h3>
                <hr />
                <p>
                  This panel contains all the hosts involved in the playbook.
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

export default class PlaybookHosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  render() {
    const { playbook } = this.props;
    const { search } = this.state;
    const filteredHosts = playbook.hosts.filter(
      host => host.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
    return (
      <div className="table-response">
        <div className="dataTables_header">
          <div className="dataTables_filter">
            <input
              className="form-control"
              placeholder="Search a host"
              type="search"
              value={search}
              onChange={e => this.setState({ search: e.target.value })}
            />
          </div>
          <div className="dataTables_info">
            Showing <b>{filteredHosts.length}</b> of{" "}
            <b>{playbook.hosts.length}</b> hosts
            <HostsHelpIcon />
          </div>
        </div>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Alias</th>
            </tr>
          </thead>
          <tbody>
            {filteredHosts.map(host => (
              <tr key={host.id}>
                <td>{host.name}</td>
                <td>{host.alias}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
