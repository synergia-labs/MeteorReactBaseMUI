import React from "react";
import {hasValue} from "/imports/libs/hasValue";
import {simpleValueStyle} from "./SimpleValueViewStyle";

interface ISimpleValueView {
    value:string;
    styles?:object;
}

export default ({value, styles}:ISimpleValueView) => {

    if(!hasValue(value)){
        return <div/>
    }

    return (
      <div style={simpleValueStyle.displayValue}> {value} </div>
    );
}
