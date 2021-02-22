import React from "react";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import {hasValue} from "/imports/libs/hasValue";
import {sliderFieldStyle} from "./SliderFieldStyle";

export default ({name,label,value,onChange,readOnly,error, ...otherProps}:IBaseSimpleFormComponent)=>{

  const handleChange = (event: React.BaseSyntheticEvent, value: number) => {
    if(!readOnly){
      onChange({target:{value: value}},{name, value: value});
    }
  }

    return (
      <div key={name} style={error? sliderFieldStyle.containerSliderError:sliderFieldStyle.containerSlider}>
        <SimpleLabelView label={label}/>
        <div style={sliderFieldStyle.subContainerSlider}>
          {!hasValue(value) || value!="-" ?
            (
              <Slider
                key={`slider-${value}`}
                id='slider'
                name='slider'
                defaultValue={value || 0}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={otherProps.min || 0}
                max={otherProps.max || 10}
                disabled={readOnly}
                onChange={handleChange}
                valueLabelDisplay="on"
              />
            ): null
          }
        </div>
      </div>
    )
}
