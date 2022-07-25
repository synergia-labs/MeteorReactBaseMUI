import React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import Star from '@mui/icons-material/Star';
import StarBorder from '@mui/icons-material/StarBorder';

interface IRatingField {
    name: string;
    onChange?: (fieldTarget: object, field: object) => void;
    error?: boolean;
    readOnly?: boolean;
    label?: string;
    value?: number;
    max?: number;
    icon?: JSX.Element;
    emptyIcon?: JSX.Element;
    size?: 'large' | 'small' | 'medium' | undefined;
}

export const RatingField = ({
    name,
    label = 'Rating',
    onChange,
    error,
    readOnly,
    value,
    max = 5,
    icon,
    emptyIcon,
    size = 'large',
}: IRatingField) => {
    const [ratingValue, setRatingValue] = React.useState<number | null>(value || null);

    React.useEffect(() => {
        handleChange();
    }, [ratingValue]);

    const handleChange = () => {
        //@ts-ignore
        onChange({ name, target: { name, value: ratingValue } }, { name, value: ratingValue });
    };

    return (
        <Box
            sx={{
                '& > legend': { mt: 2 },
                border: error ? '1px solid #DD0000' : 'none',
            }}
        >
            <SimpleLabelView label={label} />
            <Rating
                name="simple-controlled"
                value={ratingValue}
                onChange={(_event, newValue) => {
                    setRatingValue(newValue);
                }}
                size={size}
                readOnly={!!readOnly}
                max={max}
                icon={icon ? icon : <Star fontSize="inherit" />}
                emptyIcon={emptyIcon ? emptyIcon : <StarBorder fontSize="inherit" />}
            />
        </Box>
    );
};
