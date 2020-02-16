import { queues } from './model'
import { Queue } from './queue'

export default async function request (target, request) {

  let queue

  if (queues[target.domain]) {
    queue = queues[target.domain]
  } else {
    queue = new Queue()
    queues[target.domain] = queue
  }

  await queue.add(target, request)

}
