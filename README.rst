ara-web
=======

ARA Records Ansible playbooks and makes them easier to understand and troubleshoot.

``ara-web`` is a standalone and stateless web client interface to the API
provided by ARA_.

Documentation is available at `ara.readthedocs.io <https://ara.readthedocs.io/en/feature-1.0/>`_.

Requirements
============

- Latest LTS release of the `Node.js runtime <https://nodejs.org/en/download/>`_
- An instance of the ARA_ API server installed and running
- The `public/config.json`_ file configured to use your API server

.. _ARA: https://github.com/ansible-community/ara
.. _public/config.json: https://github.com/ansible-community/ara-web/blob/master/public/config.json

Running the web interface
=========================

::

    git clone https://github.com/ansible-community/ara-web
    cd ara-web
    npm install
    npm start

Running tests
=============

::

    npm test

Contributors
============

See contributors on GitHub_.

.. _GitHub: https://github.com/ansible-community/ara-web/graphs/contributors

Copyright
=========

::

    Copyright (c) 2019 Red Hat, Inc.

    ARA is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ARA is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ARA.  If not, see <http://www.gnu.org/licenses/>.
