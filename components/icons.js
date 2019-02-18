import React from 'react';
import SvgIcon from 'react-native-svg-icon';
import svgs from './svgIcons';

const IconSvg = (props) => <SvgIcon {...props} svgs={svgs} />;

export default IconSvg;