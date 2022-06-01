import Router from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Cookies from "universal-cookie";
import { apiRequest } from "../public/lib/apiOperations";
import { getParams } from "../public/lib/generalOperations";
import {
  getLocationValue,
  indicateWrongLocation,
  isLocationValid,
  parseLocation,
} from "../public/lib/locationOperations";
import { redirectOnLogin, nullifyUndefinedValues } from "../public/lib/profileOperations";
import {
  getLastCompletedTutorialStep,
  getLastStepBeforeSkip,
} from "../public/lib/tutorialOperations";
import { getAllHubs } from "../public/lib/hubOperations.js";
import getTexts from "../public/texts/texts";
import UserContext from "../src/components/context/UserContext";
import Layout from "../src/components/layouts/layout";
import BasicInfo from "../src/components/signup/BasicInfo";
import AddInfo from "./../src/components/signup/AddInfo";
import AddInterests from "../src/components/signup/AddInterests";
import { Typography } from "@material-ui/core";

export async function getServerSideProps(ctx) {
  const [allHubs] = await Promise.all([getAllHubs(ctx.locale, true)]);
  return {
    props: nullifyUndefinedValues({
      allHubs: allHubs,
    }),
  };
}

const useStyles = makeStyles({
  box: {
    borderRadius: "10%",
    shadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: "0.3s",
    width: 600,
  },
});

export default function Signup({ allHubs }) {
  const { ReactGA } = useContext(UserContext);

  const [userInfo, setUserInfo] = React.useState({
    email: "",
    password: "",
    repeatpassword: "",
    first_name: "",
    last_name: "",
    location: {},
    newsletter: "",
  });
  const classes = useStyles();
  const cookies = new Cookies();
  const { user, locale } = useContext(UserContext);
  const texts = getTexts({ page: "profile", locale: locale });
  //Information about the completion state of the tutorial
  const tutorialCookie = cookies.get("finishedTutorialSteps");
  const isClimateActorCookie = cookies.get("tutorialVariables");
  const curTutorialStep = getLastCompletedTutorialStep(tutorialCookie);
  const lastCompletedTutorialStep =
    curTutorialStep === -1
      ? getLastStepBeforeSkip(cookies.get("lastStepBeforeSkipTutorial"))
      : curTutorialStep;
  const steps = ["basicinfo", "personalinfo", "interestsinfo"];
  const [curStep, setCurStep] = useState(steps[0]);
  const [errorMessage, setErrorMessage] = useState("");
  const locationInputRef = useRef(null);
  const [locationOptionsOpen, setLocationOptionsOpen] = useState(false);
  const handleSetLocationOptionsOpen = (bool) => {
    setLocationOptionsOpen(bool);
  };
  const [errorMessages, setErrorMessages] = useState(
    steps.reduce((obj, step) => {
      obj[step] = null;
      return obj;
    }, {})
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    if (user) {
      redirectOnLogin(user, "/", locale);
    }
  });

  const [interestsInfo, setInterestsInfo] = React.useState();
  const [hubInfo, setHubInfo] = React.useState([]);



  const handleBasicInfoSubmit = (event, values) => {
    event.preventDefault();
    setUserInfo({
      ...userInfo,
      email: values.email,
      password: values.password,
      repeatpassword: values.password,
    });
    //TODO: add check if email is still available
    if (values.password !== values.repeatpassword)
      setErrorMessages({ ...errorMessages, [steps[0]]: texts.passwords_dont_match });
    else setCurStep(steps[1]);
  };

  const handleAddInfoSubmit = (event, values) => {
    event.preventDefault();
    const params = getParams(window?.location?.href);
    if (!isLocationValid(values.location)) {
      indicateWrongLocation(locationInputRef, setLocationOptionsOpen, setErrorMessage, texts);
      return;
    }
    const location = getLocationValue(values, "location");
    setUserInfo({
      ...userInfo,
      first_name: values.first_name,
      last_name: values.last_name,
      location: location,
      sendNewsletter: values.sendNewsletter,
    });
    setCurStep(steps[2]);
  };

  const handleAddInterestsSubmit = (event, values) => {
    event.preventDefault();
    
    // add interests submit etc
  };

  const handleSkipInterestsSubmit = (event, values) => {
    const payload = {
      email: userInfo.email.trim().toLowerCase(),
      password: userInfo.password,
      first_name: userInfo.first_name.trim(),
      last_name: userInfo.last_name.trim(),
      location: parseLocation(userInfo.location),
      send_newsletter: userInfo.sendNewsletter,
      from_tutorial: params?.from_tutorial === "true",
      is_activist: isClimateActorCookie?.isActivist,
      last_completed_tutorial_step: lastCompletedTutorialStep,
      source_language: locale,
      // hubs,
    };
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    setIsLoading(true);
    apiRequest({
      method: "post",
      url: "/signup/",
      payload: payload,
      headers: headers,
      locale: locale,
    })
      .then(function () {
        ReactGA.event({
          category: "User",
          action: "Created an Account",
        });
        Router.push({
          pathname: "/accountcreated/",
        });
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        if (error.response.data.message)
          setErrorMessages({ ...errorMessages, [steps[2]]: error.response.data.message });
        else if (error.response.data.length > 0)
          setErrorMessages({ ...errorMessages, [steps[2]]: error.response.data[0] });
      });
  };

  
  const handleGoBackFromAddInfo = (event, values) => {
    setUserInfo({
      ...userInfo,
      first_name: values.first_name,
      last_name: values.last_name,
      location: getLocationValue(values, "location"),
    });
    setCurStep(steps[0]);
  };

  const handleGoBackFromInterestsInfo = (event, values) => {
    setUserInfo({
      ...userInfo,
      // todo: figure out how to input the saved location properly
      location: {},
      // add interests
    });
    setCurStep(steps[1]);
  };

  const handleOnInterestsInfoTextFieldChange = (hub, description) => {
    // setInterestsInfo({...interestsInfo, [url_slug]: description})
    const asdf = hubInfo?.filter((h) => h.url_slug !== hub.url_slug)
    setHubInfo([...asdf, {...hub, description: description}]);
  };
  
  const onSelectNewHub = (event) => {
    event.preventDefault();
    const hub = allHubs.find((h) => h.name === event.target.value);
    if (hubInfo?.filter((h) => h.url_slug === hub.url_slug)?.length === 0) {
      // setUserInfo({
      //   ...userInfo,
      //   hubs: [...userInfo.hubs, hub],
      // });
      setHubInfo([...hubInfo, {...hub, description: ""}]);
      // setInterestsInfo({...interestsInfo, [url_slug]: ""});
    }
  };

  const onClickRemoveHub = (hub) => {
    const hubsAfterRemoval = hubInfo?.filter((h) => h.url_slug !== hub.url_slug);
    // setUserInfo({
    //   ...userInfo,
    //   hubs: hubsAfterRemoval,
    // });
    setHubInfo(hubsAfterRemoval);
    // let interestsInfoAfterRemoval = interestsInfo;
    // delete interestsInfoAfterRemoval[hub.url_slug];
    // setInterestsInfo(interestsInfoAfterRemoval);
  };

  const parseHubsForRequest = (hubs) => {
    const skipInterests=false;
    if (skipInterests) return [];
    else return hubs.map((h) => ({key: h.url_slug, value: h.name}))
  };

  

  return (
    <Layout isLoading={isLoading} message={errorMessage} messageType={errorMessage && "error"}>
      <div>{JSON.stringify(parseHubsForRequest(hubInfo))}
      </div>
      <div>{JSON.stringify(hubInfo)}</div>
      <div>{JSON.stringify(allHubs)}</div>
      {/* <Card className={classes.box}> */}
      {curStep === "interestsinfo" && ( //"basicinfo" && (
        <BasicInfo
          title={texts.sign_up}
          values={userInfo}
          handleSubmit={handleBasicInfoSubmit}
          errorMessage={errorMessages[steps[0]]}
        />
      )}
      {curStep === "personalinfo" && (
        <AddInfo
          values={userInfo}
          handleSubmit={handleAddInfoSubmit}
          errorMessage={errorMessages[steps[1]]}
          handleGoBack={handleGoBackFromAddInfo}
          locationInputRef={locationInputRef}
          locationOptionsOpen={locationOptionsOpen}
          handleSetLocationOptionsOpen={handleSetLocationOptionsOpen}
        />
      )}
      {curStep == "basicinfo" && ( // "interestsinfo" && (
        <AddInterests
          hubInfo={hubInfo}
          allHubs={allHubs}
          errorMessage={errorMessages[steps[2]]}
          handleSkip={handleSkipInterestsSubmit}
          handleSubmit={handleAddInterestsSubmit}
          handleGoBack={handleGoBackFromInterestsInfo}
          onSelectNewHub={onSelectNewHub}
          onClickRemoveHub={onClickRemoveHub}
          onInterestsInfoTextFieldChange={handleOnInterestsInfoTextFieldChange}
        />
      )}
      {/* </Card> */}
    </Layout>
  );
}
