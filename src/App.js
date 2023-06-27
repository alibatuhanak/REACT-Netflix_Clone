import React, { useEffect, useState } from "react";
import Row from "./components/Row";
import Banner from "./components/Banner";
import requests from "./requests";
import axios from "axios";
import Navbar from "./components/Navbar";

const App = () => {
	const [genres, setGenres] = useState([]);
	const [wishList, setWishList] = useState([]);
	const [likes, setLikes] = useState([]);

	const fetchGenres = async () => {
		const genres = await axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=" + process.env.REACT_APP_API_KEY);
		console.log(genres.data.genres);
		setGenres(genres.data.genres);
	};

	useEffect(() => {
		fetchGenres();
	}, []);

	return (
		<>
			<Navbar likes={likes} wishList={wishList} />
			<div className="w-full min-h-screen h-auto bg-[#141414] flex flex-col">
				<Banner />
				{requests.map((request, key) => (
					<Row
						setLikes={setLikes}
						likes={likes}
						wishList={wishList}
						setWishList={setWishList}
						genres={genres}
						key={key}
						title={request.title}
						fetchUrl={request.fetch}
					/>
				))}
			</div>
		</>
	);
};

export default App;
