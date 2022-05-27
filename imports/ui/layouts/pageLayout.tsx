import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import * as appSyles from "../../materialui/styles";

export interface IPageLayout {
  title: string;
  children?: React.ReactNode;
  actions?: object[];
  hiddenTitleBar?: boolean;
  navigate?: { goBack: () => void };
  onBack?: () => void;
}

export const PageLayout = (props: IPageLayout) => {
  const { title, children, actions, hiddenTitleBar, navigate, onBack } = props;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        maxHeight: "100%",
      }}
    >
      {!hiddenTitleBar ? (
        <div
          style={{
            position: "relative",
            zIndex: 2,
            top: 0,
            left: 0,
            width: "100%",
            backgroundColor: appSyles.primaryColor,
          }}
        >
          <Container
            style={{
              backgroundColor: appSyles.primaryColor,
              color: "#FFF",
              height: 45,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {(onBack || navigate) && (
                <Button
                  onClick={() => {
                    if (onBack) {
                      onBack();
                    } else {
                      navigate.goBack();
                    }
                  }}
                >
                  <ArrowBackIcon style={{ width: 20, height: 20 }} />
                </Button>
              )}
              <Typography
                style={{
                  display: "flex",
                  // fontFamily: 'PTSans-Bold',
                  fontSize: "15px",
                  fontWeight: "bold",
                  fontStretch: "normal",
                  fontStyle: "normal",
                  lineHeight: 1.2,
                  letterSpacing: "0.78px",
                  textAlign: "center",
                  color: "#ffffff",
                  textTransform: "none",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {title || "SEM TITULO"}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {actions}
            </div>
          </Container>
        </div>
      ) : null}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          paddingBottom: hiddenTitleBar ? 60 : undefined,
          overflowX: "hidden",
          overflowY: "auto",
          maxHeight: "100%",
          position: "relative",
        }}
      >
        <Container
          id={"pageContainer"}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "100%",
            flex: 1,
            padding: 8,
            backgroundColor: appSyles.pageBackgroundColor,
          }}
        >
          {children}
        </Container>
      </div>
    </div>
  );
};
