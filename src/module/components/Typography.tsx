"use client";

import MuiTypography, { TypographyProps } from "@mui/material/Typography";
import { CSSProperties, ElementType } from "react";
import { styled } from "@mui/material";

export interface IMuiTypographyProps extends TypographyProps {
  fontWeight?: CSSProperties["fontWeight"];
  letterSpacing?: CSSProperties["letterSpacing"];
  altColor?: keyof typeof fontColor;
  fontSize?: CSSProperties["fontSize"];
  textTransform?: CSSProperties["textTransform"];
  textDecorationLine?: CSSProperties["textDecorationLine"];
  component?: ElementType;
}

const fontColor = {
  textBlackDark: "#000000",
  textBlackMain: "#333333",
  textBlackLight: "#666666",
  textBlackDisable: "#999999",

  textWhiteDark: "#ffffff",
  textWhiteMain: "#f0f0f0",
  textWhiteLight: "#cccccc",
  textWhiteDisable: "#999999",

  primaryDark: "#0000ff",
  primaryMain: "#0000aa",
  primaryLight: "#6666ff",

  secondaryDark: "#ff00ff",
  secondaryMain: "#aa00aa",
  secondaryLight: "#ff66ff",

  infoDark: "#00ffff",
  infoMain: "#00aaaa",
  infoLight: "#66ffff",

  successDark: "#00ff00",
  successMain: "#00aa00",
  successLight: "#66ff66",

  warningDark: "#ff9900",
  warningMain: "#ff6600",
  warningLight: "#ffcc66",

  errorDark: "#ff0000",
  errorMain: "#cc0000",
  errorLight: "#ff6666",

  blackDark: "#000000",
  blackMain: "#333333",
  blackLight: "#666666",

  grayDark: "#808080",
  grayMain: "#999999",
  grayLight: "#cccccc",
};

export interface IFontColor {
  [key: string]: string;
}

const forwardPropCondition = (prop: string) =>
  prop !== "altColor" &&
  prop !== "fontWeight" &&
  prop !== "textDecorationLine" &&
  prop !== "letterSpacing" &&
  prop !== "fontSize" &&
  prop !== "textTransform" &&
  prop !== "textDecorationLine";

export const CustomMuiTypography = styled(MuiTypography, {
  shouldForwardProp: forwardPropCondition,
})<IMuiTypographyProps>(
  ({
    fontWeight,
    altColor,
    textTransform,
    textDecorationLine,
    fontSize,
    letterSpacing,
  }) => ({
    ...(altColor && {
      color: fontColor[altColor],
    }),
    ...(fontWeight && {
      fontWeight,
    }),
    ...(textDecorationLine && {
      textDecorationLine,
    }),
    ...(textTransform && {
      textTransform,
    }),
    ...(fontSize && {
      fontSize,
    }),
    ...(letterSpacing && {
      letterSpacing,
    }),
  })
);

export const Typography = (props: IMuiTypographyProps) => {
  return (
    <>
      <CustomMuiTypography {...props} />
    </>
  );
};
