import React, {FC} from "react";
import MyUserAvatar from "../../user/components/MyUserAvatar";

import {useMe} from "../../user/hooks/useMe";
import styled from "styled-components";
import AppLogo from "./AppLogo";

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

const RightDiv = styled.div`
  width: 50%;
  display: flex;

  justify-content: flex-end;
`;

const LeftDiv = styled.div`
  width: 50%;
  display: block;
  margin: auto;
  justify-content: flex-start;
`;

const ActionBarMain: FC = () => {
    const me = useMe().data?.me;


    return <MainDiv>
        <Header>
            <LeftDiv>
                <AppLogo />
            </LeftDiv>
            <RightDiv>
                <MyUserAvatar/>
            </RightDiv>
        </Header>
    </MainDiv>
        ;
};

export default ActionBarMain;
