import React from "react";
import {hasValue} from "/imports/libs/hasValue";
import {simpleLabelStyle} from "./SimpleLabelViewStyle";

interface ISimpleLabelView {
    label:string;
    style?:object;
}

export default ({label, style}:ISimpleLabelView) => {

    if(!hasValue(label)){
        return <div/>
    }

    return (
      <label style={{...simpleLabelStyle.displayLabel, ...styles}}> {label} </label>
    );
}
