import { Link as LinkPrimitive } from "react-router";

import { cn } from "@/lib/utils";

export function Link({
	className,
	children,
	href,
	...props
}: React.ComponentProps<"a">) {
	return (
		href && (
			<LinkPrimitive
				to={href}
				className={cn(
					"font-bold text-blue flex items-center gap-1.5 uppercase hover:underline",
					className,
				)}
				{...props}
			>
				{children}
			</LinkPrimitive>
		)
	);
}
