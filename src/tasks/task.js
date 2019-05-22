function _getAveragesFromTask(task) {
  const results = task.results;
  return results.reduce(
    (acc, result) => {
      acc.statuses[result.status] += 1;
      acc.total_duration += parseFloat(result.duration);
      acc.average_duration = acc.total_duration / results.length;
      return acc;
    },
    {
      total_duration: 0.0,
      average_duration: 0.0,
      statuses: {
        ok: 0,
        failed: 0,
        skipped: 0,
        unreachable: 0,
        changed: 0,
        ignored: 0,
        unknown: 0
      }
    }
  );
}
export function extractTasksFromPlays(plays) {
  return plays.reduce((acc, play) => {
    for (const task of play.tasks) {
      const taskAverages = _getAveragesFromTask(task);
      acc.push({
        name: task.name,
        action: task.action,
        results: task.results,
        task_id: task.id,
        statuses: taskAverages.statuses,
        average_duration: taskAverages.average_duration
      });
    }
    return acc;
  }, []);
}
