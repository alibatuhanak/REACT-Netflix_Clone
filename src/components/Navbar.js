import React, { useState } from "react";
import { BiHelpCircle, BiUser, BiTransferAlt, BiSolidEditAlt, BiSolidLike, BiCheckCircle } from "react-icons/bi";
import { MdOutlineNotifications, MdOutlineSearch } from "react-icons/md";

const Navbar = ({ wishList, likes }) => {
	const [color, setColor] = useState(false);
	const [menu, setMenu] = useState(false);
	const [account, setAccount] = useState(false);
	const [notify, setNotify] = useState(false);
	const [search, setSearch] = useState(false);

	const changeColor = () => {
		if (window.scrollY >= 90) {
			setColor(true);
		} else return setColor(false);
	};

	window.addEventListener("scroll", changeColor);

	const types = ["Home", "Tv Shows", "Movies", "New & Popular", "My List", "Browse by Languages"];

	const compareTime = time => {
		var times = "";

		let localTime = Date.parse(new Date().toLocaleString());
		let notifyTime = Date.parse(time);

		var differenceMin = Math.floor((localTime - notifyTime) / 1000 / 60).toString();
		var differenceHour = Math.floor(differenceMin / 60).toString();
		var differenceDay = Math.floor(differenceHour / 24).toString();

		switch (true) {
			case differenceDay < 30 && differenceHour > 24:
				times = differenceDay + " day ago";
				break;
			case differenceHour < 24 && differenceMin > 60:
				times = differenceHour + " hours ago";
				break;
			case differenceMin < 60:
				times = differenceMin + " minutes ago";
				break;
			default:
				break;
		}

		return times;
	};

	return (
		<div
			className={
				"w-full h-[70px] bg-[#191919]  fixed z-[100] px-11 py-2 flex justify-start items-center text-sm font-medium text-white transition-transform transform ease-in-out " +
				(color ? "bg-opacity-100" : "bg-opacity-0")
			}
		>
			<img className="max-[850px]:h-12 h-[76px] mr-5 cursor-pointer" src="/assets/netflix-brand.png" alt="brand" />
			<div
				onMouseEnter={() => setMenu(true)}
				onMouseLeave={() => setMenu(false)}
				className="relative w-auto h-auto max-[850px]:h-10 max-[850px]:flex max-[850px]:items-center"
			>
				<li className="hidden max-[850px]:block cursor-pointer ">Browse &#9660;</li>
				<ul
					className={
						"w-auto h-auto text-[0.85rem] font-medium max-[850px]:hidden " +
						(menu
							? " max-[850px]:!flex max-[850px]:flex-col max-[850px]:absolute max-[850px]:bg-black max-[850px]:bg-opacity-80 max-[850px]:z-50 max-[850px]:w-60 max-[850px]:h-auto max-[850px]:-right-10 max-[850px]:top-10 "
							: "")
					}
				>
					{types.map((item, key) => (
						<li
							key={key}
							className="inline cursor-pointer mx-2 p-1 max-[850px]:mx-0 max-[850px]:text-center max-[850px]:p-4 hov max-[850px]:first:border-t-2 max-[850px]:border-white min-[850px]:hover:opacity-50"
						>
							{item}
						</li>
					))}
				</ul>
			</div>
			<div className=" flex w-40 justify-around  ml-auto mt-3">
				<div className="relative max-[800px]:hidden ">
					<label
						className={"!z-50 right-0 top-0 absolute " + (search ? "ser " : "")}
						onClick={() => setSearch(prevSearch => !prevSearch)}
						htmlFor="search"
					>
						<MdOutlineSearch className="cursor-pointer" size={30} />
					</label>
					<input
						onMouseLeave={() => setSearch(false)}
						placeholder="Titles, peoples, genres"
						className={
							"transf -z-50 absolute right-0 top-0 placeholder-gray-500 border-2 border-white bg-[#202020]  outline-none " +
							(search ? "  active disabled:hidden" : " hidden")
						}
						type="text"
						name="search"
						id="search"
					/>
				</div>
				<div onMouseEnter={() => setNotify(true)} onMouseLeave={() => setNotify(false)} className="relative">
					<MdOutlineNotifications className="cursor-pointer" size={30} />
					<div
						className={
							"max-[800px]:w-[280px]  absolute right-0 top-12 w-[408px] h-[395px] border-t-2 border-white overflow-y-scroll bg-black bg-opacity-90 " +
							(notify ? "block" : "hidden")
						}
					>
						{likes.map((item, id) => (
							<div key={id} className="w-full h-28 border-b-2 border-gray-600 flex p-3 justify-start items-center gap-x-3">
								<img
									className="w-[112px] h-auto rounded-xl"
									src={`https://image.tmdb.org/t/p/original${item?.movie?.backdrop_path}`}
									alt={item?.movie?.name}
								/>
								<div className="h-3/4 w-auto">
									<h2 className="text-[#ccc] break-words text-base">{item?.movie?.title}</h2>
									<p className="text-[gray]">{compareTime(item?.dateTime)}</p>
								</div>
							</div>
						))}
					</div>
				</div>
				{/* 
				UTILS
				<div className="relative">
					<BiSolidLike className="cursor-pointer" size={35} />
					<div className="absolute bottom-2 right-2 bg-[#B20710] w-4 h-4 flex justify-center items-center rounded-md">{likes.length}</div>
				</div>
				<div className="relative">
					<BiCheckCircle className="cursor-pointer" size={35} />
					<div className="absolute bottom-2 right-2 bg-[#B20710] w-4 h-4 flex justify-center items-center rounded-md">{wishList.length}</div>
				</div> */}
				<div onMouseEnter={() => setAccount(true)} onMouseLeave={() => setAccount(false)} className={"relative h-[50px] w-auto  "}>
					<img className="pointer-events-none h-7 rounded-xl  cursor-pointer" src="/assets/account.png" alt="brand" />

					<ul
						className={
							"absolute text-xs bg-black bg-opacity-90 text-white w-60 h-auto top-12 right-4 border border-gray-700 " +
							(account ? "block" : "hidden")
						}
					>
						<li className="kov p-4 text-left cursor-pointer flex items-center gap-x-2 ">
							<BiSolidEditAlt size={25} />
							Manage Profiles
						</li>
						<li className="kov p-4 text-left cursor-pointer flex items-center gap-x-2">
							<BiTransferAlt size={25} />
							Transfer Profile
						</li>
						<li className="kov p-4 text-left cursor-pointer flex items-center gap-x-2">
							<BiUser size={25} /> Account
						</li>
						<li className="kov p-4 text-left cursor-pointer flex items-center gap-x-2">
							<BiHelpCircle size={25} /> Help Center
						</li>
						<li className="kov p-4 text-left cursor-pointer border border-t-2 border-gray-500">Sign out of Netflix</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
