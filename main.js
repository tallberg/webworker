import { Feeder } from "./modules/feeder.js";
import { msToString } from "./modules/time-to-string.js";
import { WorkerManager } from "./modules/worker-manager.js";

const out = document.getElementById('out');;
const current = document.getElementById('current');
const progress = document.getElementById('progress');

// const target = '2804890A4B43E24D922447DDAAAD3B2A'; //FFF
const target = '722A5443E3B3EE1B5DA271AE9F477F10'; //FFFF
// const target = '5A554D4B4CC04DFED2311CFE2AA544B2'; //FFFFF

function testResult(data) {
    const result = data[1];
    if(result !== target) { 
	    return false;
	}
	const endTime = new Date
	const plaintext = data[0];
	out.innerHTML = `<h3>${plaintext}</h3><p>${msToString(endTime - startTime)}</p>`;
	clearInterval(progressInterval);
	return true;
}

const range = '0123456789ABCDEF';
//const range = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const feeder = new Feeder(range);
const onMessage = response => testResult(response.data);
const workerManager = new WorkerManager('worker.js', 4, feeder, onMessage, true);
const startTime = new Date;

let lastVal = 0;
let progressInterval = setInterval(() => {
    const prog = feeder.progress();
    progress.value = prog.percent;
    current.innerText = `${feeder.current()} ${2 * (prog.current - lastVal)}#/s`;
    lastVal = prog.current;
}, 500);

