"use client";
import * as Slider from "@radix-ui/react-slider";
import {
	SquareLogo,
	Compass,
	SubtractSquare,
	ArrowArcRight,
	ArrowsClockwise,
} from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";
import { useStore } from "../../lib/useStore.js";
import { generateJSXMeshGradient as grad } from "meshgrad";
import { useEffect, useState } from "react";

import Gallery from "./Gallery.jsx";
function Control(props) {
	const setFrameGap = useStore((state) => state.setFrameGap);
	const setRadius = useStore((state) => state.setRadius);
   
	return (
		<label htmlFor="" className="flex flex-col items-left gap-2">
			<div className="flex items-center gap-2">{props.children}</div>
			<Slider.Root
				className="relative flex items-center select-none touch-none h-5"
				defaultValue={() => {
					switch (props.label) {
						case "Frame Gap":
							return [25];
						default:
							return [50];
					}
				}}
				max={100}
				step={1}
				onValueChange={(e) => {
					if (props.label === "Frame Gap") {
						setFrameGap(e[0]);
					} else if (props.label === "Round") {
						setRadius(e[0]);
					}
				}}
			>
				<Slider.Track className="bg-primary/25 relative grow rounded-full h-[6px]">
					<Slider.Range className="absolute bg-primary rounded-full h-full" />
				</Slider.Track>
				<Slider.Thumb
					className="block w-4 h-4 bg-white rounded-[10px] focus:outline-none"
					aria-label={props.label}
				/>
			</Slider.Root>
		</label>
	);
}

function ShadowControl(props) {
	const shadow = useStore((state) => state.shadow);
	const setShadow = useStore((state) => state.setShadow);

	return (
		<>
			<div className="flex items-center gap-2 mb-2">
				<SubtractSquare size={22} className="text-primary" />
				<p>Shadow</p>
			</div>
			<div className="bg-primary rounded-md w-full flex items-center justify-between p-2 text-secondary">
				{["sm", "md", "lg", "xl", "2xl"].map((variant, index) => (
					<button
						key={index + ""}
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

function EditorSection()
{
	const gradient = useStore((state) => state.gradient);
	const setGradient = useStore((state) => state.setGradient);
	return(<ul className="flex flex-col items-left gap-4">
	<li className="flex items-center gap-2" key="first">
		{/*<Square className="fill-primary" weight="fill" size={22} />*/}
		<div
			className="w-5 h-5 aspect-square rounded-md bg-primary/25"
			style={gradient}
		/>
		<p>Gradient</p>
		<button
			className="ml-auto bg-primary text-md font-semibold text-secondary rounded-md p-2 px-3 flex items-center gap-1"
			onClick={(e) => setGradient(grad(6))}
		>
			<ArrowsClockwise weight="fill" size={18} />
			random
		</button>
	</li>
	<li key="second">
		<Control label="Frame Gap">
			<SquareLogo size={22} className="text-primary" />
			<p>Frame Gap</p>
		</Control>
	</li>
	<li key="third">
		<Control label="Angle">
			<Compass size={22} className="text-primary" />
			<p>Angle</p>
		</Control>
	</li>
	<li key="fourth">
		<Control label="Round">
			<ArrowArcRight size={22} className="text-primary" />
			<p>Roundness</p>
		</Control>
	</li>
	<li className="fifth">
		<ShadowControl />
	</li>
</ul>
)
}




export default function (props) {
	const [openGallery,setGallery]=useState(false);
	const gallery = useStore((state) => state.gallery);
	return (
		<div className="w-full lg:w-1/3">
			<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-8 flex items-center gap-4">
				<p onClick={() =>setGallery(false)} className={` cursor-pointer  ${!openGallery?"text-primary border-b-[3px] border-primary ":"text-slate-600"} w-fit`}>
					Edit
				</p>
				<p onClick={() =>setGallery(true)} className={` ${openGallery?"text-primary border-b-[3px] border-primary":"text-slate-600"} w-fit cursor-pointer`}>Gallery({gallery.length})</p>
			</h3>
			<div>
				{
					openGallery?<Gallery />:<EditorSection />
				}
			</div>
		</div>
	);
}
