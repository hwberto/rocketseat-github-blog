import { useEffect } from "react";
import { Link, Outlet } from "react-router";

import { useContext } from "@/context";

export function Layout() {
	const { fetchIssues, fetchUserInfo } = useContext((state) => state);

	useEffect(() => {
		fetchIssues();
		fetchUserInfo();
	}, []);

	return (
		<>
			<div className="bg-[url('/cover.svg')] bg-center bg-cover h-74 flex items-center justify-center">
				<Link to="/">
					<img src="/logo.png" alt="" className="-mt-16" />
				</Link>
			</div>
			<main className="mx-auto container space-y-4 -mt-20 xl:max-w-5xl pb-10">
				<Outlet />
			</main>
		</>
	);
}
