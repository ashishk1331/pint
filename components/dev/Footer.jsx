import { Heart } from "@phosphor-icons/react";

export default function (props) {
	return (
		<footer className="w-full flex flex-col items-center gap-2 p-2 my-8 text-white">
			<p className="flex items-center gap-1">
				Crafted with
				<Heart weight="fill" className="fill-primary" size={22} />
				for you.
			</p>
			<p className="flex items-center gap-1">
				by
				<a
					href="https://github.com/ashishk1331"
					target="_blank"
					className="text-primary border-b border-primary"
				>
					@ashishk1331
				</a>
				and
				<a
					href="https://github.com/anurag-327"
					target="_blank"
					className="text-primary border-b border-primary"
				>
					@anurag-327
				</a>
			</p>
		</footer>
	);
}
