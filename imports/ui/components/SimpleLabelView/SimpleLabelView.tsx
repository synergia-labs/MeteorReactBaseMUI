import React from "react";
import {hasValue} from "/imports/libs/hasValue";

interface ISimpleLabelView {
    label:string;
    style?:object;
}

export default ({label, style}:ISimpleLabelView) => {

    if(!hasValue(label)){
        return <div/>
    }

    return (
        <label
        style={{
            color: 'rgba(0, 0, 0, 0.54)',
            padding: 0,
            fontSize: '1rem',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '0.00938em',
            ...style
        }}>
            {label}</label>)
}