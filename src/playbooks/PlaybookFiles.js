import React, { Component } from "react";
import { Button, Icon, Modal } from "patternfly-react";

export default class PlaybookFiles extends Component {
  state = {
    showModal: false,
    filePath: null,
    fileContent: null
  };

  close = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { playbook } = this.props;
    const { showModal, filePath, fileContent } = this.state;
    return (
      <div className="table-response">
        <Modal show={showModal} onHide={this.close} bsSize="large">
          <Modal.Header>
            <button
              className="close"
              onClick={this.close}
              aria-hidden="true"
              aria-label="Close"
            >
              <Icon type="pf" name="close" />
            </button>
            <Modal.Title>{filePath}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <pre>
              <code>{fileContent}</code>
            </pre>
          </Modal.Body>
          <Modal.Footer>
            <Button
              bsStyle="default"
              className="btn-cancel"
              onClick={this.close}
            >
              close
            </Button>
          </Modal.Footer>
        </Modal>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {playbook.files.map(file => (
              <tr key={file.id}>
                <td>{file.path}</td>
                <td className="text-center">
                  <Button
                    bsStyle="primary"
                    onClick={() =>
                      this.setState({
                        showModal: true,
                        filePath: file.path,
                        fileContent: file.content
                      })
                    }
                  >
                    <Icon name="eye" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
