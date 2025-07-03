import React, { isValidElement } from "react";
import { isValidElementType } from "react-is";

export function isComponent(item: any) {
	return isValidElement(item) || isValidElementType(item);
}
