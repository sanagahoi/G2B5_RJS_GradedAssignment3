import { ChangeEvent, Fragment, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../styles/NavigationBar.css";
import Main from "./Main";
import MovieDetails from "./MovieDetails";

function NavigationBar() {
	const [search, setSearch] = useState("");

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	return (
		<Fragment>
			<Router>
				<nav className="navigate-tabs">
					<div className="nav-options">
						
						<Link to={""} state={{ tab: "movies-coming" }}>
							<span>Coming Soon</span>
						</Link>
						<Link to={""} state={{ tab: "movies-in-theaters" }}>
							<span>Movies in Theaters</span>
						</Link>
						<Link to={""} state={{ tab: "top-rated-india" }}>
							<span>Top Rated Indian</span>
						</Link>
						<Link to={""} state={{ tab: "top-rated-movies" }}>
							<span>Top Rated Movies</span>
						</Link>
						<Link to={""} state={{ tab: "favourite" }}>
							<span>Favourites </span>
						</Link>
					</div>
					<div className="input-group">
						<input type="text" placeholder="Search Movie" onChange={handleSearch} />
					</div>
				</nav>

				<Routes>
					<Route path="" element={<Main searchValue={search} />} />
					<Route path="/:MovieName" element={<MovieDetails />} />
				</Routes>
			</Router>
		</Fragment>
	);
}

export default NavigationBar;
