import { useEffect, useState } from "react";
import { useParams } from "react-router";

import type { Issue as TIssue } from "@/context";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Link } from "@/components/link";

import {
	FaArrowUpRightFromSquare,
	FaCalendarDay,
	FaChevronLeft,
	FaComment,
	FaGithub,
} from "react-icons/fa6";

import axios from "axios";

export default function Issue() {
	const [issue, setIssue] = useState<TIssue>();
	const [differenceDate, setDifferenceDate] = useState("");
	const { number } = useParams();

	useEffect(() => {
		axios
			.get<TIssue>(
				`https://api.github.com/repos/hwberto/rocketseat-github-blog/issues/${number}`,
			)
			.then((res) => setIssue(res.data));
	}, []);

	useEffect(() => {
		if (issue?.created_at) {
			setDifferenceDate(
				formatDistance(new Date(issue.created_at), new Date(), {
					locale: ptBR,
				}),
			);
		}
	}, [issue]);

	return (
		<>
			<section className="w-full p-7 bg-base-profile rounded-default shadow-lg shadow-black/20 space-y-4">
				<div className="flex justify-between items-center w-full">
					<Link href="/">
						<FaChevronLeft className="text-sm" />
						Voltar
					</Link>
					<Link
						href={`https://github.com/hwberto/rocketseat-github-blog/issues/${number}`}
						target="_blank"
					>
						Ver no Github <FaArrowUpRightFromSquare className="text-sm" />
					</Link>
				</div>
				<h1 className="text-title text-2xl font-bold mt-6 w-full line-clamp-2 break-all">
					{issue?.title}
				</h1>
				<ul className="mt-5 flex gap-5 *:flex *:items-center *:gap-2 *:text-subtitle *:[&>svg]:text-base-label">
					<li>
						<FaGithub />
						{issue?.user.login}
					</li>
					<li>
						<FaCalendarDay />
						Há {differenceDate}
					</li>
					<li>
						<FaComment />
						{issue?.comments}{" "}
						{issue?.comments === 1 ? "comentário" : "comentários"}
					</li>
				</ul>
			</section>
			<section className="p-8 prose invert">
				<ReactMarkdown remarkPlugins={[remarkGfm]}>{issue?.body}</ReactMarkdown>
			</section>
		</>
	);
}
