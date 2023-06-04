"use client";
import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import {
	SquareLogo,
	Compass,
	SubtractSquare,
	CircleHalf,
} from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";

function Control(props) {
	return (
		<label htmlFor="" className="flex flex-col items-left gap-2">
			<div className="flex items-center gap-2">{props.children}</div>
			<Slider.Root
				className="relative flex items-center select-none touch-none h-5"
				defaultValue={[50]}
				max={100}
				step={1}
			>
				<Slider.Track className="bg-primary/25 relative grow rounded-full h-[6px]">
					<Slider.Range className="absolute bg-primary rounded-full h-full" />
				</Slider.Track>
				<Slider.Thumb
					className="block w-4 h-4 bg-white rounded-[10px] focus:outline-none"
					aria-label="Volume"
				/>
			</Slider.Root>
		</label>
	);
}

function ShadowControl(props) {
	const [shadow, setShadow] = useState("lg");

	return (
		<>
			<div className="flex items-center gap-2 mb-2">
				<SubtractSquare size={22} className="text-primary" />
				<p>Shadow</p>
			</div>
			<div className="bg-primary rounded-md w-full flex items-center justify-between p-2 text-secondary">
				{["sm", "md", "lg", "xl", "2xl"].map((variant) => (
					<button
						className={twMerge(
							"scroll-m-20 font-semibold tracking-wide p-1 px-2 rounded-md",
							shadow === variant && "bg-secondary text-primary"
						)}
						onClick={(e) => setShadow(variant)}
					>
						{variant}
					</button>
				))}
			</div>
		</>
	);
}

export default function (props) {
	return (
		<div className="w-1/3">
			<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-8 border-b-[3px] border-primary text-primary w-fit">
				Edit
			</h3>
			<ul className="flex flex-col items-left gap-4">
				<li>
					<Control>
						<SquareLogo size={22} className="text-primary" />
						<p>Frame Gap</p>
					</Control>
				</li>
				<li>
					<Control>
						<Compass size={22} className="text-primary" />
						<p>Angle</p>
					</Control>
				</li>
				<li>
					<Control>
						<CircleHalf size={22} className="text-primary" />
						<p>Blur</p>
					</Control>
				</li>
				<li>
					<ShadowControl />
				</li>
			</ul>
		</div>
	);
}
