import Box from '@mui/material/Box'
import React from 'react'
import { loadingStyleSx } from './LoadingStyle'
import Typography from '@mui/material/Typography'

export const Loading = (): JSX.Element => {
    return (
        <Box component={'div'} sx={loadingStyleSx.container}>
            <Typography>Carregando ...</Typography>
        </Box>
    )
}

interface ILoading {
    loading: boolean | null
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
        )
    }
}
