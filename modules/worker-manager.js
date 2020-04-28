export class WorkerManager {
    _jobName;
    _generator;
    _onMessage;
    _instances = [];
    _halt = false;
    /**
     * @param {string} job Path to worker script
     * @param {number} instances Number of workers to instanciate
     * @param {any} generator Object or generator with a "next" function to seed the workers
     * @param {function} onMessageFunction Function to handle worker responses. If returns true all workers will terminate. If false, worker will be called with generator.next().
     * @param {bool} startOnCreate Should workers start directly?
     */
    constructor(job, instances = 1, generator, onMessageFunction, startOnCreate = false) {
        this._job = job;
        this._generator = generator;
        this._onMessage = onMessageFunction;
        this.spawn(instances, startOnCreate);        
    }
    spawn = (instances, post = true) => {
        console.log('spawn', instances, post);
        while (instances-- > 0) {
            const worker = this._instances[this._instances.push(new Worker(this._job)) - 1];
            worker.onmessage = (response) => {
                if(this._onMessage(response) || this._halt) {
                    this._halt = true;
                    worker.terminate();
                } else {
                    worker.postMessage(this._generator.next());
                }
            };
            if(post) {
                console.log('workwork',worker);
                worker.postMessage(this._generator.next());
            }
        }
    }
    post = () => {
        for(let instance of this._instances) {
            instance.postMessage(this._generator.next())
        }
    }
    halt = () => {
        this._halt = true;
    }
}