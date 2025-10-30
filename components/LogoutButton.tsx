"use client";
import { Activity } from "react";
import { useSession, signOut } from "next-auth/react";

function LogoutButton() {
    const { data: session } = useSession();
    return (
        <Activity mode={session ? 'visible' : 'hidden'}>
            <img
                onClick={() => signOut()}
                src={session?.user?.image!}
                alt="Profile pic"
                className="w-10 h-10 mx-auto mb-2 rounded-full cursor-pointer"
            />
        </Activity>
    );

}

export default LogoutButton;