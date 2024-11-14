"use client"

import React from 'react';
import {UserInfo} from "@/components/auth";
import {useCurrentUser} from "@/hooks/use-current-user";

const ClientPage = () => {

    const user = useCurrentUser();

    return (
        <div>
            <UserInfo
                label="☎️ Client Component"
                user={user}
            />
        </div>
    );
};

export default ClientPage;
