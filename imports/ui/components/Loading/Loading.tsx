import Box from '@mui/material/Box';
import React from 'react';
import { loadingStyleSx } from './LoadingStyle';
import { Carregando } from '/imports/ui/components/Loading/Carregando';

export const Loading = (): JSX.Element => {
    return (
        <Box component={'div'} sx={loadingStyleSx.container}>
            <Carregando />
        </Box>
    );
};

interface ILoading {
    loading: boolean | null;
}

/**
 * Show Compoment se loading props is false.
 * @param Component
 */
export function showLoading<P extends object>(
    Component: React.ComponentType<P>
): React.ComponentType<P | any> {
    return ({ loading, ...props }) => {
        return (
            <>
                <Component {...(props as P)} />
                {loading && <Loading />}
            </>
        );
    };
}
