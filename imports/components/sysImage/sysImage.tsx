import React, { ImgHTMLAttributes, useEffect, useState } from "react";
import { imageNames, ImageNameType } from "./images";

interface ISysImage {
	name: ImageNameType;
	props?: ImgHTMLAttributes<HTMLImageElement>;
}

const SysImage: React.FC<ISysImage> = ({ name, props }) => {
	const src = imageNames[name];

	// Se for um svg, não é possível aplicar certas alterações se ele for adicionado
	// dentro de uma imagem. Para isso precisamos utilizar um componente diferente.
	const isSvg = src.endsWith(".svg");
	const [svgContent, setSvgContent] = useState<string | null>(null);

	useEffect(() => {
		if (isSvg) {
			fetch(src).then(async (res) => setSvgContent(await res.text()));
		} else {
			setSvgContent(null);
		}
	}, [src, setSvgContent]);

	return svgContent ? <span dangerouslySetInnerHTML={{ __html: svgContent }} /> : <img src={src} {...props} />;
};

export default SysImage;
