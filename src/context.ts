import { create } from "zustand";
import axios from "axios";

export type Issue = {
	url: string;
	number: number;
	title: string;
	comments: number;
	body: string;
	created_at: string;
	user: {
		login: string;
	};
};

type States = {
	userInfo: {
		login: string;
		name?: string;
		company?: string;
		bio?: string;
		followers: number;
		avatar_url: string;
	} | null;
	issues: Issue[] | null;
	filteredIssues: {
		items: Issue[] | null;
	} | null;
};

type Actions = {
	fetchUserInfo: () => void;
	fetchIssues: () => void;
	searchIssues: (q: string) => void;
	clearSearch: () => void;
};

export const useContext = create<States & Actions>((set) => ({
	userInfo: null,
	issues: null,
	filteredIssues: null,
	fetchUserInfo: async () => {
		const data = await axios
			.get<States["userInfo"]>("https://api.github.com/users/hwberto")
			.then((res) => res.data);

		return set({ userInfo: data });
	},
	fetchIssues: async () => {
		const data = await axios
			.get<States["issues"]>(
				"https://api.github.com/repos/hwberto/rocketseat-github-blog/issues",
			)
			.then((res) => res.data);

		return set({ issues: data, filteredIssues: { items: data } });
	},
	searchIssues: async (q) => {
		const data = await axios
			.get<States["filteredIssues"]>(
				`https://api.github.com/search/issues?q=${q} repo:hwberto/rocketseat-github-blog`,
			)
			.then((res) => res.data);

		return set({ filteredIssues: data });
	},
	clearSearch: () => set({ filteredIssues: null }),
}));
