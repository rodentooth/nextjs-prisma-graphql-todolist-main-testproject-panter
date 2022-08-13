import type {NextPage} from "next";
import {signIn, signOut} from "next-auth/react";
import React, {useState} from "react";
import Heading from "../ui/layout/components/Heading";
import PageLayout from "../ui/layout/components/PageLayout";
import ActionBarWithReturnAndTitle from "../ui/actionBar/components/ActionBarWithReturn";
import FAB from "../ui/floatingActionButton/components/FAB";
import {useMe} from "../ui/user/hooks/useMe";
import TodoListEditor from "../ui/todoListSingle/components/todoListEditor";


const ViewTodoList: NextPage = () => {
    const me = useMe().data?.me;

    const [backgroundColour, setBackgroundColour] = useState("#ffffff");


    const goToMain = () => {
        window.location.assign('/');
    }
    const setColour = colour => {
        console.log(colour)
        setBackgroundColour(colour);

    }



    return (
        <PageLayout style={{background: `linear-gradient(${backgroundColour}, ${backgroundColour}, white)`}}>
            <Heading>Todolist Panter</Heading>
            {me ? (
                <div>
                    <ActionBarWithReturnAndTitle/>
                    <TodoListEditor setColour={setColour} />
                </div>
            ) : null
            }
        </PageLayout>
    );
};

export default ViewTodoList;
