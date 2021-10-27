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
      d="M210.253 26.5C215.084 26.5 219 22.5839 219 17.7532C219 12.9225 215.084 9.00647 210.253 9.00647C205.423 9.00647 201.506 12.9225 201.506 17.7532C201.506 22.5839 205.423 26.5 210.253 26.5Z"
      stroke="#E9E9E9"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M208.067 22.4911C208.939 22.4911 209.646 21.784 209.646 20.9118C209.646 20.0396 208.939 19.3325 208.067 19.3325C207.194 19.3325 206.487 20.0396 206.487 20.9118C206.487 21.784 207.194 22.4911 208.067 22.4911Z"
      stroke="#E9E9E9"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M214.019 19.8184C214.891 19.8184 215.599 19.1113 215.599 18.2391C215.599 17.3669 214.891 16.6599 214.019 16.6599C213.147 16.6599 212.44 17.3669 212.44 18.2391C212.44 19.1113 213.147 19.8184 214.019 19.8184Z"
      stroke="#E9E9E9"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M208.431 16.0525C209.303 16.0525 210.01 15.3454 210.01 14.4732C210.01 13.601 209.303 12.8939 208.431 12.8939C207.559 12.8939 206.852 13.601 206.852 14.4732C206.852 15.3454 207.559 16.0525 208.431 16.0525Z"
      stroke="#E9E9E9"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M23 20.6C23 23.5 20.7 25.8 17.8 25.8C14.9 25.8 12.6 23.5 12.6 20.6C12.6 18.5 15.5 13.4 17 11C17.4 10.4 18.3 10.4 18.7 11C20.1 13.4 23 18.4 23 20.6Z"
      stroke="#E9E9E9"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M274 26.9999C278.97 26.9999 283 22.9705 283 17.9999C283 13.0294 278.97 9 274 9C269.029 9 265 13.0294 265 17.9999C265 22.9705 269.029 26.9999 274 26.9999Z"
      stroke="#E9E9E9"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M274 12.1251V18.5L278.375 15.75"
      stroke="#E9E9E9"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
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
