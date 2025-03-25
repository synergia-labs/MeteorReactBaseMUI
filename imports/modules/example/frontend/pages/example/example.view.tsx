import React from "react";
import { Hello } from "../../components/example/hello.view";
import Style from "./example.style";

export default function helloFromModule() {
	return (
		<Style.container>
			<Hello />
		</Style.container>
	);
}
