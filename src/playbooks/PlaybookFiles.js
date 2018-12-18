import React, { Component } from "react";
import styled from "styled-components";

const ModalBox = styled.div`
  position: absolute;
`;

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
      <div>
        {showModal && (
          <ModalBox>
            <div
              className="pf-c-modal-box pf-m-lg"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <div className="pf-c-modal-box__close">
                <button
                  className="pf-c-button pf-m-plain"
                  aria-label="Close"
                  onClick={this.close}
                >
                  <i className="fas fa-times" aria-hidden="true" />
                </button>
              </div>
              <header className="pf-c-modal-box__header">
                <h1 className="pf-c-modal-box__header-title" id="modal-title">
                  {filePath}
                </h1>
              </header>
              <div className="pf-c-modal-box__body" id="modal-description">
                <pre>
                  <code>{fileContent}</code>
                </pre>
              </div>
              <footer className="pf-c-modal-box__footer">
                <button type="button" onClick={this.close}>
                  close
                </button>
              </footer>
            </div>
          </ModalBox>
        )}
        <table className="pf-c-table pf-m-compact pf-m-grid-md" role="grid">
          <tbody>
            {playbook.files.map(file => (
              <tr key={file.id}>
                <td>{file.path}</td>
                <td>
                  <button
                    type="button"
                    className="pf-c-button pf-m-secondary"
                    onClick={() =>
                      this.setState({
                        showModal: true,
                        filePath: file.path,
                        fileContent: file.content
                      })
                    }
                  >
                    See content
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
