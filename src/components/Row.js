import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { AiFillLike, AiFillDislike, AiOutlinePlusCircle, AiOutlineLike, AiFillPlusCircle } from "react-icons/ai";
import YouTube from "react-youtube";

function Row({ title, fetchUrl, genres, setWishList, wishList, setLikes, likes }) {
	const [movies, setMovies] = useState([]);

	const opts = {
		height: "100%",
		width: "100%",
		playerVars: {
			autoplay: 1,
		},
	};

	useEffect(() => {
		const fetchAPI = async () => {
			const { data } = await axios.get("https://api.themoviedb.org/3" + fetchUrl);

			setMovies(data.results);
		};

		fetchAPI();
	}, [fetchUrl]);

	const onHoverMovie = id => {
		setMovies(prevMovies => prevMovies.map(movie => (movie.id === id ? { ...movie, hover: true } : movie)));
	};
	const onLeaveMovie = id => {
		setMovies(prevMovies => prevMovies.map(movie => (movie.id === id ? { ...movie, hover: false } : movie)));
	};

	const addWishList = id => {
		const exist = wishList.find(item => item.id === id);

		if (!exist) {
			setWishList(prevWishList => [...prevWishList, { id }]);
		} else {
			setWishList(prevWishList => prevWishList.filter(item => item.id !== id));
		}
	};

	const date = new Date();
	let day = date.toLocaleString();

	const addLike = (id, movie) => {
		const exist = likes.find(item => item.id === id);
		if (!exist) {
			setLikes(prevLikes => [...prevLikes, { id, movie, dateTime: day }]);
		} else {
			setLikes(prevLikes => prevLikes.filter(item => item.id !== id));
		}
	};

	return (
		<div className="ml-12  h-auto">
			<h1 className="text-2xl text-white font-semibold">{title}</h1>

			<Carousel
				additionalTransfrom={0}
				arrows
				autoPlaySpeed={3000}
				centerMode={false}
				className="z-50"
				containerClass="container-with-dots"
				dotListClass=""
				focusOnSelect={false}
				draggable={false}
				infinite
				pauseOnHover
				renderArrowsWhenDisabled={false}
				renderButtonGroupOutside={false}
				renderDotsOutside={false}
				responsive={{
					desktop: {
						breakpoint: {
							max: 3000,
							min: 1024,
						},
						items: 7,
						partialVisibilityGutter: 40,
					},
					mobile: {
						breakpoint: {
							max: 464,
							min: 0,
						},
						items: 2,
						partialVisibilityGutter: 30,
					},
					tablet: {
						breakpoint: {
							max: 1024,
							min: 464,
						},
						items: 4,
						partialVisibilityGutter: 30,
					},
				}}
				rewind={false}
				rewindWithAnimation={false}
				rtl={false}
				shouldResetAutoplay
				showDots={false}
				slidesToSlide={4}
			>
				{movies.slice(0, 10).map((movie, key) => (
					<div
						onMouseEnter={() => {
							onHoverMovie(movie.id);
						}}
						onMouseLeave={() => onLeaveMovie(movie.id)}
						key={key}
						className="w-auto h-44 px-1 hover:scale-125 relative transition ease-in"
					>
						{movie.hover ? (
							<YouTube className="h-full w-auto absolute -top-8" videoId="b9EkMc79ZSU" opts={opts} />
						) : (
							<img
								className="w-auto h-full object-contain rounded-lg "
								src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
								alt={movie.name}
							/>
						)}
						{movie.hover === false && (
							<h4 className="absolute top-[50%] left-[50%] text-xs text-center text-white  -translate-y-1/2 -translate-x-1/2 w-2/3  max-[850px]:w-[80%]">
								{movie?.original_name || movie?.original_title || movie?.title || movie?.name}
							</h4>
						)}

						{movie.hover === true && (
							<div className="text-white p-1 float-left w-[98.6%] rounded-b-md h-24 bg-[#202020] absolute  top-24 z-20 flex flex-col justify-start items-start shadow-lg shadow-neutral-900">
								<div>
									{wishList.find(item => item.id === movie.id) ? (
										<AiFillPlusCircle
											onClick={() => addWishList(movie.id)}
											className="cursor-pointer absolute right-1 top-2 h-6 w-6 max-[850px]:h-4 max-[850px]:w-4 max-[850px]:top-5 max-[850px]:right-3 "
										/>
									) : (
										<AiOutlinePlusCircle
											onClick={() => addWishList(movie.id)}
											className="cursor-pointer absolute right-1 top-2 h-6 w-6 max-[850px]:h-4 max-[850px]:w-4 max-[850px]:top-5 max-[850px]:right-3 "
										/>
									)}
									{likes.find(item => item.id === movie.id) ? (
										<AiFillLike
											onClick={() => addLike(movie.id, movie)}
											className="cursor-pointer absolute right-8 top-2 h-6 w-6  max-[850px]:h-4 max-[850px]:w-4 max-[850px]:top-5"
										/>
									) : (
										<AiOutlineLike
											onClick={() => addLike(movie.id, movie)}
											className="cursor-pointer absolute right-8 top-2 h-6 w-6  max-[850px]:h-4 max-[850px]:w-4 max-[850px]:top-5"
										/>
									)}
								</div>
								<div className="w-full text-[0.6rem] flex text-white justify-start gap-x-1">
									{genres
										.filter(item => movie.genre_ids.includes(item.id))
										.slice(0, 2)
										.map((x, id) => (
											<h5 key={id}>{x.name}</h5>
										))}
								</div>
								<div className="flex justify-start items-end mt-4">
									<div className="bg-red-800 w-5 h-5 flex justify-center items-center">
										{movie.vote_average > 7.2 ? <AiFillLike color="white" /> : <AiFillDislike color="white" />}
									</div>
									{movie.vote_average > 7.2 && <h6 className="text-xs">&nbsp;Most Liked</h6>}
								</div>
							</div>
						)}
					</div>
				))}
			</Carousel>
		</div>
	);
}

export default Row;
