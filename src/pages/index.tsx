import type {NextPage} from "next";
import {signIn, signOut} from "next-auth/react";
import React from "react";
import Heading from "../ui/layout/components/Heading";
import PageLayout from "../ui/layout/components/PageLayout";
import ActionBarMain from "../ui/actionBar/components/ActionBarMain";
import FAB from "../ui/floatingActionButton/components/FAB";
import {useMe} from "../ui/user/hooks/useMe";
import Link from 'next/link'
import styled from "styled-components";
import {Puff} from "react-loader-spinner";
import {useAllTodoLists} from "../ui/todoListSingle/hooks/useTodoList";
import AppLogo from "../ui/actionBar/components/AppLogo";



const TodoListElement = styled.div`


  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;

  width: 90%;
  height: auto;
  margin: 5px;
  padding: 20px 10px 20px 10px;
  border-radius: 5px;
  background-color: #d7ffed;
  cursor: pointer;
`;

const LogInButtonDiv = styled.div`
  display: flex;

  margin: 20px;
  justify-content: center;
`;
const AppLogoDiv = styled.div`
  display: flex;

  width: auto;
  margin: auto;
  margin-bottom: 50px;
  justify-content: center;
  
`;
const CenterDiv = styled.div`
  width: 100%;
  display: block;

  margin: auto;
  margin-top: 50px;
  justify-content: center;
  text-align: center;
`;
const SignInButton = styled.button`

  border: none;
  background-color: aquamarine;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;

`;



const Empty = styled.p`

  font-style: italic;

`;
const PuffContainer = styled.div`


  margin-top: 50px;
    display: flex;
  width: 100%;
  height: 100px;
  justify-content:center;
  align-items: center;
`;


const Home: NextPage = () => {
    const me = useMe().data?.me;

    const {data, error, loading} = useAllTodoLists({});
    if (loading) {
        return <PageLayout><ActionBarMain/><PuffContainer><p>Great Things Are Loading...</p></ PuffContainer><PuffContainer><Puff color="#00BFFF" height={80} width={80}/></PuffContainer></PageLayout>
    }
    if (error) return <PageLayout><ActionBarMain/><p>Oh no, something went wrong! :(</p></PageLayout>

    console.log(data)


    const todoLists = data.myTodoList?.map((element, i) =>
        <div key={i}>
            <Link href={`/viewTodoList/?id=${element.id}&title=${element.title}&colour=${encodeURIComponent(element.colorCode)}`}>
                <TodoListElement style={{background: element.colorCode}}>
                    <p>{element.title === "" ? <Empty>Empty Title</Empty> : element.title}</p>
                </TodoListElement>
            </Link>
        </div>
    )


    return (
        <PageLayout>
            {me ? (
                <div>
                    <ActionBarMain/>
                    {todoLists?.length>0 ? (
                    todoLists
                    ) :(
                    <CenterDiv>
                        <Heading>Nothing here yet 😮</Heading>
                        <p>But don't worry: You can click on the + button below to create your first Todo item</p>

                    </CenterDiv>
                    )}
                    <FAB/>
                </div>
            ) : (
                <CenterDiv>
                <Heading>Panter Sampleproject "Todolist" </Heading>
                    <AppLogoDiv>
                    <AppLogo />
                    </AppLogoDiv>
                    <p>Hi 👋 </p>

                    <p> </p>
                    <p>You can Sign in below to start using your Todo List</p>
                    <LogInButtonDiv>
                        <SignInButton onClick={() => signIn("google")}>Sign in with Google</SignInButton>
                    </LogInButtonDiv>
                </CenterDiv>
            )}
        </PageLayout>
    );
};

export default Home;
