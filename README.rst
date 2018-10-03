ara-web
=======

ARA Records Ansible playbook runs and makes the recorded data available and
intuitive for users and systems.

``ara-web`` is a component of ARA which provides a stateless web interface that
queries the ARA API for displaying results of Ansible playbook runs.

Requirements
============

- Latest LTS release of the `Node.js runtime`_
- An instance of the `ARA API server`_ installed and running

.. _Node.js runtime: https://nodejs.org/en/download/
.. _ARA API server: https://github.com/openstack/ara-server

Running the web interface
=========================

::

    git clone https://github.com/openstack/ara-web
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

.. _GitHub: https://github.com/openstack/ara-web/graphs/contributors

Copyright
=========

::

    Copyright (c) 2018 Red Hat, Inc.

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
