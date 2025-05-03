import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
	return (
		<input
			className={cn(
				"border border-base-border bg-base-input p-3.5 w-full rounded-md text-base-text focus:border-blue focus:outline-0 placeholder:text-base-label transition-colors",
				className,
			)}
			{...props}
		/>
	);
}
