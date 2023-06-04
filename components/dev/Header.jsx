import { Atom, DownloadSimple } from "@phosphor-icons/react";

export default function (props) {
	return (
		<header className="w-full flex items-center gap-4 p-4 px-0">
			<div className="p-2 rounded-full bg-primary">
				<Atom className="text-secondary" size={32} />
			</div>
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				Pint
			</h1>

			<button className="text-md font-semibold bg-primary text-secondary p-2 px-4 rounded-md ml-auto flex items-center gap-2">
				<DownloadSimple className="text-secondary" size={22} />
				Download
			</button>
		</header>
	);
}
