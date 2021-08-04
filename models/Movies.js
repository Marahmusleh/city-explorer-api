class Movies{
    constructor(moviesData){
        this.title = moviesData.title;
        this.poster_path = `https://image.tmdb.org/t/p/w500/${moviesData.poster_path}`
        this.original_language = moviesData.original_language;
        this.vote_average = moviesData.vote_average;
        this.overview = moviesData.overview;
        this.popularity = moviesData.popularity;
        this.release_date = moviesData.release_date;
        this.vote_count=moviesData.vote_count;
        
    }
}
module.exports= Movies




