const API_KEY = process.env.REACT_APP_API_KEY;

const requests = [
	{ fetch: `/trending/all/week?api_key=${API_KEY}&language=en-US`, title: "Trending Now" },
	{ fetch: `/movie/top_rated?api_key=${API_KEY}&language=en-US`, title: "Top Rated" },
	{ fetch: `/discover/movie?api_key=${API_KEY}&with_genres=28`, title: "Action Movies" },
	{ fetch: `/discover/movie?api_key=${API_KEY}&with_genres=35`, title: "Comedy Movies" },
	{ fetch: `/discover/movie?api_key=${API_KEY}&with_genres=27`, title: "Horror Movies" },
	{ fetch: `/discover/movie?api_key=${API_KEY}&with_genres=10749`, title: "Romance Movies" },
	{ fetch: `/discover/movie?api_key=${API_KEY}&with_genres=16`, title: "Animations" },
];

export default requests;
