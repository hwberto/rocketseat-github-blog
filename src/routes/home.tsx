import { useState, useEffect } from "react";

import { useContext } from "@/context";

import { Link } from "@/components/link";

import { Card } from "@/components/card";
import { Input } from "@/components/input";

import {
	FaBuilding,
	FaGithub,
	FaUserGroup,
	FaArrowUpRightFromSquare,
} from "react-icons/fa6";

export default function Home() {
	const [searchInputValue, setSearchInputValue] = useState("");
	const { userInfo, issues, filteredIssues, searchIssues, clearSearch } =
		useContext((state) => state);

	useEffect(() => {
		if (searchInputValue.trim() === "") clearSearch();

		const timeout = setTimeout(() => {
			searchIssues(searchInputValue);
		}, 750);

		return () => clearTimeout(timeout);
	}, [searchInputValue]);

	return (
		<>
			<section className="w-full p-7 bg-base-profile sm:rounded-default shadow-lg shadow-black/20 flex max-md:flex-col gap-6 items-center">
				<img
					src={userInfo?.avatar_url}
					alt="Humberto Gonçalves"
					className="max-md:size-40 size-37 rounded-lg"
				/>
				<div className="space-y-3 w-full">
					<div className="flex justify-between items-center">
						<h1 className="text-title text-2xl font-bold">{userInfo?.name}</h1>
						<Link href="https://github.com/hwberto" target="_blank">
							Github
							<FaArrowUpRightFromSquare className="text-sm" />
						</Link>
					</div>
					<span className="text-base-text">{userInfo?.bio}</span>
					<ul className="mt-5 flex max-md:flex-col gap-5 *:flex *:items-center *:gap-2 *:text-subtitle *:[&>svg]:text-base-label">
						<li>
							<FaGithub />
							{userInfo?.login}
						</li>
						<li>
							<FaBuilding />
							{userInfo?.company || "Em nenhuma empresa"}
						</li>
						<li>
							<FaUserGroup />
							{userInfo?.followers} seguidores
						</li>
					</ul>
				</div>
			</section>
			<section className="mt-10 space-y-8 max-md:px-10">
				<div className="space-y-2">
					<div className="flex justify-between items-center">
						<h2 className="font-bold text-subtitle text-lg">Publicações</h2>
						<span className="text-base-span text-sm">
							{issues?.length}{" "}
							{issues?.length === 1 ? "publicação" : "publicações"}
						</span>
					</div>
					<Input
						type="text"
						placeholder="Buscar conteúdo"
						onChange={(e) => setSearchInputValue(e.target.value)}
					/>
				</div>
				<ul className="mx-auto w-max grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-30">
					{searchInputValue.trim() && filteredIssues?.items?.length
						? filteredIssues.items.map((item) => (
								<Card
									key={item.number}
									content={item.body}
									title={item.title}
									issueNumber={item.number}
									date={item.created_at}
								/>
							))
						: issues?.map((item) => (
								<Card
									key={item.number}
									content={item.body}
									title={item.title}
									issueNumber={item.number}
									date={item.created_at}
								/>
							))}
				</ul>
			</section>
		</>
	);
}
