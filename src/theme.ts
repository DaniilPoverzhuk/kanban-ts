import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primary: string;
    secondary: string;
    background: string;
    backgroundMain: string;
  }
}

const theme = {
  primary: "#fff",
  secondary: "#727A89",
  background: "#2C2C38",
  backgroundMain: "#21212D",
};

export default theme;
