import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style */

function SvgComponent(props) {
    return (
        <Svg
            id='prefix__Icons'
            viewBox='0 0 32 32'
            xmlSpace='preserve'
            xmlns='http://www.w3.org/2000/svg'
            {...props}>
            <Path d='M8.9 16c0 .6.1 1.2.2 1.8L11 16l-1.8-1.8c-.2.6-.3 1.2-.3 1.8z' fill='none' />
            <Path
                d='M16 23.1c-3.3 0-6-2.2-6.8-5.2l-6.7 6.7C5.3 29 10.3 32 16 32c3.1 0 6-.9 8.5-2.5l-6.7-6.7c-.6.2-1.2.3-1.8.3z'
                fill='#34a853'
            />
            <Path
                d='M32 13.8c-.1-.5-.5-.8-1-.8H16c-.6 0-1 .4-1 1v5c0 .6.4 1 1 1h5.3c-.9 1.4-2.2 2.3-3.5 2.8l6.7 6.7C29 26.7 32 21.7 32 16v-.7c.1-.4.1-.9 0-1.5z'
                fill='#4285f4'
            />
            <Path
                d='M8.9 16c0-.6.1-1.2.2-1.8L2.5 7.5C.9 10 0 12.9 0 16s.9 6 2.5 8.5l6.7-6.7c-.2-.6-.3-1.2-.3-1.8z'
                fill='#fbbc05'
            />
            <Path
                d='M28.5 6c-1.1-1.4-2.5-2.6-4-3.6C22 .9 19.1 0 16 0 10.3 0 5.3 3 2.5 7.5l6.7 6.7C10 11.2 12.8 9 16 9c.6 0 1.2.1 1.8.3.9.3 1.7.8 2.6 1.5.3.3.7.3 1.1.1l6.7-3.3c.3-.1.5-.4.5-.7.1-.3 0-.6-.2-.9z'
                fill='#ea4335'
            />
        </Svg>
    );
}

export default SvgComponent;
