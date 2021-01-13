import React from "react";
import {hasValue} from "/imports/libs/hasValue";
import {simpleLabelStyle} from "./SimpleLabelViewStyle";
import {Typography} from "@material-ui/core";

interface ISimpleLabelView {
    label:string;
    value?:string;
    style?:object;
}

export default ({label, value, style}:ISimpleLabelView) => {
    return (
        hasValue(value) || hasValue(label) ?
            <div style={{...simpleLabelStyle.container, ...style}}>
                {hasValue(label) ?
                    <label style={simpleLabelStyle.displayLabel}>
                        {label}
                    </label>:
                    <div/>}
                {hasValue(value) ? <Typography style={simpleLabelStyle.displayValue}>{value}</Typography> :null}
            </div>
            :
            <div/>
    )
}
