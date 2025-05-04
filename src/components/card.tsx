import { Link } from "react-router";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

import { cn } from "@/lib/utils";

export function Card({
	title,
	content,
	date,
	issueNumber,
	className,
	...props
}: React.ComponentProps<"a"> &
	Readonly<{
		title: string;
		content: string;
		issueNumber: number;
		date: string;
	}>) {
	const differenceDate = formatDistance(new Date(date), new Date(), {
		locale: ptBR,
	});

	return (
		<Link
			className={cn(
				"w-104 p-6 rounded-default text-sm bg-base-post border-2 border-transparent space-y-4 hover:border-base-border",
				className,
			)}
			to={`/issue/${issueNumber}`}
			{...props}
		>
			<div className="flex max-md:flex-col md:justify-between md:items-center gap-2">
				<h1 className="text-title text-lg font-bold line-clamp-2 break-all max-w-full">
					{title}
				</h1>
				<span className="text-base-span md:px-2 min-w-max">
					Há {differenceDate}
				</span>
			</div>
			<div className="text-base-text break-all max-w-full line-clamp-5 prose">
				<ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
			</div>
		</Link>
	);
}
