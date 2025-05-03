import { createRoot } from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router";

import Home from "./routes/home";
import Issue from "./routes/issue";

import { Layout } from "./components/layout";

import "./styles/globals.css";

const router = createBrowserRouter([
	{
		Component: Layout,
		children: [
			{
				index: true,
				Component: Home,
			},
			{
				path: "/issue/:number",
				Component: Issue,
			},
		],
	},
]);

createRoot(document.getElementById("root") as HTMLDivElement).render(
	<RouterProvider router={router} />,
);
