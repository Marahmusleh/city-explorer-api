class Restaurants {
    constructor(service) {
        this.name = service.name;
        this.image_url = service.image_url;
        this.url = service.url;
        this.rating = service.rating;
        this.price = service.price;
    }
}
module.exports = Restaurants;