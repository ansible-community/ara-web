import React, { Component } from "react";

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
      <div>
        <div className="pf-l-grid pf-m-gutter pf-u-display-flex pf-u-align-items-center">
          <div className="pf-l-grid__item">
            <input
              className="pf-c-form-control"
              placeholder="Search a host"
              type="search"
              value={search}
              onChange={e => this.setState({ search: e.target.value })}
            />
          </div>
          <div className="pf-l-grid__item">
            {`Showing ${filteredHosts.length} of ${
              playbook.hosts.length
            } hosts`}
          </div>
        </div>

        <table className="pf-c-table pf-m-compact pf-m-grid-md" role="grid">
          <tbody>
            {filteredHosts.map(host => (
              <tr key={host.id}>
                <td className="pf-m-width-30">{host.name}</td>
                <td className="pf-m-width-70">{host.alias}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
