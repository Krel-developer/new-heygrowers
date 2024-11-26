const COUNTER = 62614468

export function krelYmGoal(goal) {
  try {
    if (!window.krelYmGoals) {
      window.krelYmGoals = []
    }

    if (!window.krelYmGoals[goal]) {
      window.krelYmGoals[goal] = true
      ym(COUNTER, 'reachGoal', goal)
      console.log('krelSendGoal:', goal)
    }
  } catch (error) {
    console.warn(error)
  }
}
