import { useContext, useState } from "react"
import UserContext, { UserState } from "../store";

function ConsumerComponent() {
    const user = useContext<UserState>(UserContext);

    return <>
        <div>First : {user.first}</div>
        <div>Last : {user.last}</div>
    </>;
}

function UseContextComponent() {
    const [user, setUser] = useState<UserState>({
        first: "Jane",
        last: "Smith"
    })

    return <UserContext.Provider value={user}>
        <ConsumerComponent />
    </UserContext.Provider>
}

export default UseContextComponent;