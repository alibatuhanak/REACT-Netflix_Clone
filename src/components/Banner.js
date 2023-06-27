import React, { useState, useEffect } from "react";
import axios from "axios";
import requests from "../requests";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import YouTube from "react-youtube";

const Banner = () => {
	const [banner, setBanner] = useState([]);
	const [youtube, setYoutube] = useState(false);

	const opts = {
		height: "100%",
		width: "100%",
		playerVars: {
			autoplay: 1,
		},
	};

	const fetchBanner = async () => {
		const { data } = await axios.get("https://api.themoviedb.org/3" + requests[0].fetch);
		setBanner(data.results[Math.floor(Math.random() * data.results.length - 1)]);
	};
	useEffect(() => {
		fetchBanner();
	}, []);

	const truncate = (str, i) => {
		return str?.length > i ? str.substr(0, i) + "..." : str;
	};

	return (
		<div className={`bg-white h-auto relative mb-10 `}>
			{youtube ? (
				<YouTube className="h-screen w-auto" videoId="b9EkMc79ZSU" opts={opts} />
			) : (
				<div
					className="w-auto lg:h-[100vh] h-[60vh]"
					style={{
						backgroundImage: `url(https://image.tmdb.org/t/p/original${banner?.backdrop_path})`,
						backgroundPosition: "top",
						backgroundSize: "cover",
					}}
				/>
			)}
			<div className="ban absolute bottom-0 w-full"></div>
			<div
				className={
					"absolute bottom-[36%] left-[4%] w-[25rem] max-[850px]:w-[18rem] h-auto flex flex-col justify-between items-start max-[768px]:left-[10%] max-[768px]:top-[32%]"
				}
			>
				<img className="w-16 h-16 max-[768px]:w-12 max-[768px]:h-12" src="/assets/netflix-icon.png" alt="netflix-series" />
				<h1 className="font-tilt w-full font-extrabold text-[3.3rem] max-[768px]:text-2xl max-[1068px]:text-2xl text-white leading-[4rem]">
					{banner?.name || banner?.original_title || banner?.title || banner?.name}
					<p className="text-xs mb-2">{truncate(banner?.overview, 200)}</p>
				</h1>
				<div className="flex max-[1068px]:mt-3 mt-4">
					<button
						onClick={() => setYoutube(!youtube)}
						className=" flex py-2 px-7 max-[1068px]:px-4 bg-white rounded-md items-center hover:bg-opacity-70"
					>
						<FaPlay className="max-[1068px]:w-4 max-[1068px]:h-4 w-6 h-6" color="black" />
						<h5 className="font-semibold text-lg max-[1068px]:text-sm ml-2">Play</h5>
					</button>
					<button className=" flex py-2 px-8 bg-[#454545] bg-opacity-70 hover:bg-opacity-40 rounded-md items-center  ml-2">
						<AiOutlineInfoCircle className="max-[1068px]:w-4 max-[1068px]:h-4 w-6 h-6" color="white" />
						<h5 className="font-semibold text-lg max-[1068px]:text-sm ml-2 text-white">More Info</h5>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Banner;
