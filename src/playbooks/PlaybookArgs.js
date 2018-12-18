import React, { Component } from "react";

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
    return (
      <div>
        <div className="pf-l-grid pf-m-gutter pf-u-display-flex pf-u-align-items-center">
          <div className="pf-l-grid__item">
            <input
              className="pf-c-form-control"
              placeholder="Search an argument"
              type="search"
              value={search}
              onChange={e => this.setState({ search: e.target.value })}
            />
          </div>
          <div className="pf-l-grid__item">
            {`Showing  ${filteredArgs.length} of ${args.length} args`}
          </div>
        </div>

        <table className="pf-c-table pf-m-compact pf-m-grid-md" role="grid">
          <tbody>
            {filteredArgs.map((arg, i) => (
              <tr key={i}>
                <td className="pf-m-width-30">{arg}</td>
                <td className="pf-m-width-70">{this._renderArg(playbook.arguments[arg])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
