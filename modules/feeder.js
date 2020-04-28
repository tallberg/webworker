export class Feeder {
    _current;  // current count for current length
    _alphabet; // given characters
    _len; // output length
    _base; // alphabet length
    _max; // nr of outputs for current length (used for stats)
    constructor(alpha){
        this._alphabet = alpha;
        this._current = 0;
        this._len = 1;
        this._base = alpha.length;
        this._max = Math.pow(this._base, this._len + 1) - 1;
    }
    _fromInt = (i) => {
        let result = '';
        let rest = 0;
        for(let pos = this._len; pos >= 0; pos--) {
            let rest = i % this._base;
            result = this._alphabet[rest] + result;
            i = ~~(i / this._base);
        }
        if(i !== 0){
            result += this._alphabet[0];
            this._current = 0;
            this._len++
            this._max = Math.pow(this._base, this._len + 1) - 1; 
        }
        return result;
    }
    next = () => {
        return this._fromInt(this._current++);
    }
    current = () => this._fromInt(this._current);
    progress = () => {
        return { 'current' : this._current, 'max': this._max, 'percent': this._current / this._max };
    }
    reset = () => this._current = 0;
}