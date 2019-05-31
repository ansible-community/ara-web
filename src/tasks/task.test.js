import { extractTasksFromPlays } from "./task";

test("extractTasksFromPlays", () => {
  const plays = [
    {
      id: 4,
      duration: "2.210736",
      tasks: [
        {
          id: 5,
          duration: "1.79342",
          tags: ["always"],
          results: [
            {
              id: 5,
              duration: "1.702101",
              host: { id: 3, name: "localhost", alias: "localhost" },
              started: "2019-05-17T16:55:07.993741",
              ended: "2019-05-17T16:55:09.695842",
              status: "ok"
            }
          ],
          file: {
            id: 6,
            path:
              "/home/zuul/src/opendev.org/recordsansible/ara/tests/integration/hosts.yaml"
          },
          started: "2019-05-17T16:55:07.993741",
          ended: "2019-05-17T16:55:09.787161",
          name: "Gathering Facts",
          action: "gather_facts",
          lineno: 19,
          handler: false,
          status: "completed",
          play: 4
        }
      ],
      started: "2019-05-17T16:55:07.795907",
      ended: "2019-05-17T16:55:10.006643",
      name: "Create fake hosts for host tests",
      status: "completed"
    },
    {
      id: 5,
      duration: "4.352827",
      tasks: [
        {
          id: 6,
          duration: "1.959355",
          tags: ["always"],
          results: [
            {
              id: 6,
              duration: "0.93332",
              host: { id: 5, name: "host3", alias: null },
              started: "2019-05-17T16:55:10.330416",
              ended: "2019-05-17T16:55:11.263736",
              status: "ok"
            },
            {
              id: 7,
              duration: "1.091059",
              host: { id: 6, name: "host2", alias: null },
              started: "2019-05-17T16:55:10.330416",
              ended: "2019-05-17T16:55:11.421475",
              status: "ok"
            },
            {
              id: 8,
              duration: "1.865337",
              host: { id: 7, name: "host1", alias: null },
              started: "2019-05-17T16:55:10.330416",
              ended: "2019-05-17T16:55:12.195753",
              status: "ok"
            }
          ],
          file: {
            id: 6,
            path:
              "/home/zuul/src/opendev.org/recordsansible/ara/tests/integration/hosts.yaml"
          },
          started: "2019-05-17T16:55:10.330416",
          ended: "2019-05-17T16:55:12.289771",
          name: "Gathering Facts",
          action: "gather_facts",
          lineno: 33,
          handler: false,
          status: "completed",
          play: 5
        }
      ],
      started: "2019-05-17T16:55:10.135506",
      ended: "2019-05-17T16:55:14.488333",
      name: "ARA Hosts test play",
      status: "completed"
    }
  ];

  const expectedTasks = [
    {
      name: "Gathering Facts",
      action: "gather_facts",
      average_duration: 1.7,
      statuses: {
        ok: 1,
        failed: 0,
        skipped: 0,
        unreachable: 0,
        changed: 0,
        ignored: 0,
        unknown: 0
      },
      results: [
        {
          id: 5,
          duration: "1.702101",
          host: { id: 3, name: "localhost", alias: "localhost" },
          started: "2019-05-17T16:55:07.993741",
          ended: "2019-05-17T16:55:09.695842",
          status: "ok"
        }
      ],
      task_id: 5
    },
    {
      name: "Gathering Facts",
      action: "gather_facts",
      average_duration: 1.3,
      statuses: {
        ok: 3,
        failed: 0,
        skipped: 0,
        unreachable: 0,
        changed: 0,
        ignored: 0,
        unknown: 0
      },
      task_id: 6,
      results: [
        {
          id: 6,
          duration: "0.93332",
          host: { id: 5, name: "host3", alias: null },
          started: "2019-05-17T16:55:10.330416",
          ended: "2019-05-17T16:55:11.263736",
          status: "ok"
        },
        {
          id: 7,
          duration: "1.091059",
          host: { id: 6, name: "host2", alias: null },
          started: "2019-05-17T16:55:10.330416",
          ended: "2019-05-17T16:55:11.421475",
          status: "ok"
        },
        {
          id: 8,
          duration: "1.865337",
          host: { id: 7, name: "host1", alias: null },
          started: "2019-05-17T16:55:10.330416",
          ended: "2019-05-17T16:55:12.195753",
          status: "ok"
        }
      ]
    }
  ];
  expect(extractTasksFromPlays(plays)).toEqual(expectedTasks);
});
