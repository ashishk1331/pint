import { generateJSXMeshGradient as grad } from "meshgrad"
import imageUrl from '../../images/family-tree.png'
import Image from 'next/image'

export default function(props){
	return (
		<div className="w-full aspect-video rounded-md flex" style={grad(6)}>
			<Image
				src={imageUrl}
				width={420}
				height={420}
				alt="family tree"
				className="m-auto rounded-md shadow-xl"
			/>
		</div>
	)
}