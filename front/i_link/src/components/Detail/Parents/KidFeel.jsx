// 2022.08.12 강민재, 안정현
// 아이 기분
import React from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import Divider from "@mui/material/Divider";

import { urls, baseURL } from "../../../api/axios";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../context/user";
import { getToday } from "../../../commonFuction";
import KidCard from "./KidCard";

import happy from "./FeelPng/happy.png";
import smile from "./FeelPng/smile.png";
import so_so from "./FeelPng/so_so.png";
import sad from "./FeelPng/sad.png";

const KidFeel = ({
  feel,
  setFeel,
  centerName,
  setCenterName,
  groupName,
  setGroupName,
}) => {
  const { firstKid } = useContext(UserContext);
  const getFeel = async () => {
    try {
      const response = await axios.get(
        baseURL + urls.fetchSurveysList + firstKid.kid_no,
      );
      const lenData = response.data.length;
      const latestFeel = response.data[lenData - 1];

      if (latestFeel.survey_date.slice(0, 10) === getToday()) {
        setFeel(latestFeel.survey_result);
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getCenterName = async () => {
    const response = await axios.get(
      baseURL + urls.fetchCentersDetial + firstKid.center_no,
    );
    setCenterName(response.data.center_name);
  };

  const getGroupName = async () => {
    const response = await axios.get(
      baseURL + urls.fetchGroupsDetail + firstKid.group_no,
    );
    setGroupName(response.data.group_name);
  };
  useEffect(() => {
    getFeel();
    getCenterName();
    getGroupName();
  }, []);

  return (
    <Box>
      <Grid container item sx={{ justifyContent: "space-between" }}>
        <Grid item xs sx={{ marginRight: 2 }}>
          <KidCard
            centerName={centerName}
            setCenterName={setCenterName}
            groupName={groupName}
            setGroupName={setGroupName}
          ></KidCard>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid container item xs sx={{ alignItems: "center" }}>
          <Grid item xs={12}>
            <Typography variant="h6" id="font_test" textAlign="center">
              🍀 오늘의 기분 🍀
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {feel === "1" && (
              <img
                src={sad}
                alt="슬퍼요"
                style={{ width: "100%", height: "100%" }}
              />
            )}
            {feel === "2" && (
              <img
                src={so_so}
                alt="그저 그래요"
                style={{ width: "80%", height: "80%" }}
              />
            )}
            {feel === "3" && (
              <img
                src={smile}
                alt="좋아요"
                style={{ width: "80%", height: "80%" }}
              />
            )}
            {feel === "4" && (
              <img
                src={happy}
                alt="행복해요"
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </Grid>
          <Grid item xs={12} sx={{ justifyContent: "center", marginLeft: 1 }}>
            {feel === "1" && (
              <Typography id="font_test" textAlign="center">
                오늘 "{firstKid.kid_name}"의 기분은 슬퍼요
              </Typography>
            )}
            {feel === "2" && (
              <Typography id="font_test" textAlign="center">
                오늘 "{firstKid.kid_name}"의 기분은 그저 그래요
              </Typography>
            )}
            {feel === "3" && (
              <Typography id="font_test" textAlign="center">
                오늘 "{firstKid.kid_name}"의 기분은 좋아요
              </Typography>
            )}
            {feel === "4" && (
              <Typography id="font_test" textAlign="center">
                오늘 "{firstKid.kid_name}"의 기분은 행복해요
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default KidFeel;