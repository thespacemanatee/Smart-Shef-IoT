/* eslint-disable react/no-array-index-key */
import * as React from "react";
import { Dimensions } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";

import { SPACING } from "../../resources/dimens";
import AnimatedProgressCircle from "../elements/AnimatedProgressCircle";
import AnimatedProgressRect from "../elements/AnimatedProgressRect";

const WIDTH = Dimensions.get("window").width - 2 * SPACING.spacing_16;
const RATIO = 0.1232876712;

const circleCx = [18, 82, 146, 210, 274];
const rectX = [39, 103, 167, 231];

interface AnimatedCookingProgressBarProps {
  stage: number;
}

const AnimatedCookingProgressBar = ({
  stage,
}: AnimatedCookingProgressBarProps) => (
  <Svg width={WIDTH} height={WIDTH * RATIO} viewBox="0 0 292 36" fill="none">
    {circleCx.map((cx, key) => {
      return (
        <AnimatedProgressCircle key={key} index={key} cx={cx} stage={stage} />
      );
    })}
    <Path
      d="M87.9585 20.2436C87.8532 23.4038 85.5374 25.9103 82.4848 25.9103C79.4322 25.9103 77.0111 23.4038 77.0111 20.2436C77.0111 20.2436 76.6953 17.3013 79.4322 15.4487C82.169 13.5962 82.9058 11.5256 82.4848 10C82.4848 10 86.2743 12.0705 84.59 15.9936C84.59 15.9936 83.9585 17.9551 85.5374 17.9551C85.5374 17.9551 86.6953 18.1731 86.9058 16.3205C86.9058 16.3205 88.0637 17.4103 87.9585 20.2436Z"
      stroke="#E9E9E9"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M85.2216 23.0769C85.2216 24.6026 83.9585 25.9103 82.4848 25.9103C81.0111 25.9103 79.7479 24.7116 79.7479 23.0769C79.7479 21.4423 82.4848 18.1731 82.4848 18.1731C82.4848 18.1731 85.2216 21.5513 85.2216 23.0769Z"
      stroke="#E9E9E9"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M143.032 22.7632C145.811 22.7632 148.064 21.9925 148.064 21.0418C148.064 20.091 145.811 19.3203 143.032 19.3203C140.253 19.3203 138 20.091 138 21.0418C138 21.9925 140.253 22.7632 143.032 22.7632Z"
      stroke="#E9E9E9"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M148.064 21.0417V21.3066C148.064 24.0874 145.813 26.3385 143.032 26.3385C140.251 26.3385 138 24.0874 138 21.3066V21.0417"
      stroke="#E9E9E9"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M154.288 12.6994C154.552 11.5076 153.758 10.3159 152.566 10.051C151.374 9.78619 150.183 10.5807 149.918 11.7725L148.064 20.777"
      stroke="#E9E9E9"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M23 20.6C23 23.5 20.7 25.8 17.8 25.8C14.9 25.8 12.6 23.5 12.6 20.6C12.6 18.5 15.5 13.4 17 11C17.4 10.4 18.3 10.4 18.7 11C20.1 13.4 23 18.4 23 20.6Z"
      stroke="white"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M212.921 25.962H207.364C204.372 25.962 201.95 23.54 201.95 20.5481V17.6987H218.335V20.5481C218.335 23.54 215.913 25.962 212.921 25.962Z"
      stroke="#E9E9E9"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M218.335 14.5646H201.95V17.5564H218.335V14.5646Z"
      stroke="#E9E9E9"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M212.208 12H207.934V14.5645H212.208V12Z"
      stroke="#E9E9E9"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M221.326 18.2687C221.326 18.2687 222.466 19.6934 221.184 21.5455"
      stroke="#E9E9E9"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M224.033 18.2687C224.033 18.2687 225.173 19.6934 223.891 21.5455"
      stroke="#E9E9E9"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M198.674 18.2687C198.674 18.2687 197.534 19.6934 198.816 21.5455"
      stroke="#E9E9E9"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M195.967 18.2687C195.967 18.2687 194.827 19.6934 196.109 21.5455"
      stroke="#E9E9E9"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M279.364 17.5579L278.393 18.2244L279.208 19.0742C279.865 19.7602 280.368 20.6282 280.556 21.5884C281.048 24.1072 279.416 26.5773 276.875 27.1978C274.291 27.6907 271.838 25.9892 271.343 23.4554L271.151 22.474L270.17 22.6656C267.579 23.1716 265.113 21.4679 264.617 18.9272C264.111 16.336 265.815 13.8706 268.355 13.3744C269.172 13.2149 270.025 13.277 270.723 13.5204L271.8 13.8956L272.032 12.7789C272.41 10.9538 273.8 9.45827 275.736 9.0803C278.327 8.57429 280.793 10.2781 281.289 12.8187C281.657 14.7066 280.841 16.5433 279.364 17.5579Z"
      stroke="#E9E9E9"
      strokeWidth={2}
    />
    <Rect x={39} y={17} width={22} height={2} fill="#E9E9E9" />
    <Rect x={103} y={17} width={22} height={2} fill="#E9E9E9" />
    <Rect x={167} y={17} width={22} height={2} fill="#E9E9E9" />
    <Rect x={231} y={17} width={22} height={2} fill="#E9E9E9" />
    {rectX.map((x, key) => {
      return <AnimatedProgressRect key={key} index={key} x={x} stage={stage} />;
    })}
  </Svg>
);

export default AnimatedCookingProgressBar;
