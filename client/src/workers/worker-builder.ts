export default class WorkerBuilder extends Worker {
    constructor(worker: any) {
        const code = worker.toString()
        const blob = new Blob([`(${code})()`])

        super(URL.createObjectURL(blob))
    }
}
