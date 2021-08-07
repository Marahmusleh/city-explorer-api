class Forecast {
    constructor(value) {
        this.valid_date = value.valid_date;
        this.description =`Low of ${value.low_temp}, high of ${value.high_temp} with ${value.weather.description}`
    }
}
module.exports = Forecast;
