interface Task<T> {
  fn: () => Promise<T>
  resolve: (value: T) => void
  reject: (error: any) => void
}

export class ConcurrencyPool {
  private readonly limit: number
  private running: number
  private queue: Task<any>[]

  constructor(limit: number) {
    this.limit = limit
    this.running = 0
    this.queue = []
  }

  private async runTask<T>(task: Task<T>): Promise<void> {
    this.running++
    try {
      const result = await task.fn()
      task.resolve(result)
    }
    catch (error) {
      task.reject(error)
    }
    finally {
      this.running--
      this.runNext()
    }
  }

  private runNext(): void {
    if (this.running < this.limit && this.queue.length > 0) {
      const nextTask = this.queue.shift()
      if (nextTask) {
        this.runTask(nextTask)
      }
    }
  }

  async add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const task: Task<T> = { fn, resolve, reject }
      if (this.running < this.limit) {
        this.runTask(task)
      }
      else {
        this.queue.push(task)
      }
    })
  }

  get active(): number {
    return this.running
  }

  get pending(): number {
    return this.queue.length
  }
}
