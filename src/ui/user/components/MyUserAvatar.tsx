import React, { FC, useState } from "react";
import { useMe } from "../hooks/useMe";
import styled from "styled-components";
import { signOut } from "next-auth/react";

const Image = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin: 10px;
`;
const ProfileMenu = styled.div`
  position: fixed;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
`;
const ProfileMenuBox = styled.div`
  border-radius: 10px;
  display: block;
  position: fixed;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  height: auto;
  padding: 10px;
  background-color: white;
  box-shadow: black 0px 0px 10px;
`;
const LogOutButtonDiv = styled.div`
  display: flex;

  margin: 20px;
  justify-content: center;
`;
const SignOutButton = styled.button`
  border: none;
  background-color: darkred;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin: auto;
  margin: 4px;
  text-align: center;
  display: flex;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
`;

const ProfileMenuHeadingText = styled.p`
  font-weight: bold;
  margin: auto;
  margin-bottom: 10px;
`;

const MyUserAvatar: FC = () => {
  const { data } = useMe();
  const [profileMenuVisibility, setProfileMenuVisibility] = useState(false);

  if (!data?.me?.image) return null;

  const handleProfileImgClick = () => {
    setProfileMenuVisibility(!profileMenuVisibility);
  };

  const ImageWithProps = ({ ...props }) => (
    <Image
      {...props}
      alt={data.me.name ?? ""}
      src={data.me?.image}
      onClick={handleProfileImgClick}
    />
  );

  return (
    <div>
      <ImageWithProps referrerpolicy="no-referrer" />

      {profileMenuVisibility && (
        <div>
          <ProfileMenu onClick={handleProfileImgClick} />
          <ProfileMenuBox>
            <ProfileMenuHeadingText>Your Profile Infos:</ProfileMenuHeadingText>
            <p>{data.me.name}</p>
            <p>{data.me.email}</p>

            <LogOutButtonDiv>
              <SignOutButton onClick={() => signOut({ redirect: false })}>
                Signout
              </SignOutButton>
            </LogOutButtonDiv>
          </ProfileMenuBox>
        </div>
      )}
    </div>
  );
};

export default MyUserAvatar;
