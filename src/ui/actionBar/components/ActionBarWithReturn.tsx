import React, {FC} from "react";
import MyUserAvatar from "../../user/components/MyUserAvatar";

import {useMe} from "../../user/hooks/useMe";
import styled from "styled-components";

const MainDiv = styled.div`
  width: 100%;
  height: 100px;
`;
const Header = styled.div`
  width: 100%;
  height: 80px;
  background-color: aquamarine;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
`;


const ArrowBack = styled.p`
  display: block;
  margin: auto;
  margin-left: 20px;
  justify-content: flex-start;
  font-size: 2em;
  cursor: pointer;

`;
const RightDiv = styled.div`
  width: 80%;
  display: flex;

  justify-content: flex-end;
`;

const LeftDiv = styled.div`
  width: 20%;
  display: block;
  margin: auto;
  justify-content: flex-end;
`;

const ActivityTitleH1 = styled.h1`

  margin: auto;
  margin-right: 20px;
  font-size: 1em;
  display: flex;
  font-family: "Roboto";
`;


const ActivityTitle = "Manage your List"


const ActionBarWithReturn: FC = () => {
    const me = useMe().data?.me;

    const goToMain = () => {
        window.location.assign('/');
    }


    return <MainDiv>
        <Header>
            <LeftDiv>
                <ArrowBack onClick={goToMain}>{"←"}</ArrowBack>
            </LeftDiv>

            <RightDiv>
                <ActivityTitleH1>{ActivityTitle}</ActivityTitleH1>
            </RightDiv>
        </Header>
    </MainDiv>
        ;
};

export default ActionBarWithReturn;
