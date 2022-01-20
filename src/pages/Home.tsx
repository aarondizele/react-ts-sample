import axios from "axios";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import request from "../request"

import { userState, logout } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@fluentui/react";
import { getFileTypeIconProps, FileIconType } from '@fluentui/react-file-type-icons';

export default function Home() {
    const {username, isAuthenticated} = useSelector(userState);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Home page</h1>
            <div>
                <Icon iconName="docx" />
                <Icon {...getFileTypeIconProps({ type: FileIconType.desktopFolder, size: 20, imageFileType: 'svg' }) } />
            </div>
            {username && <h2>{username}</h2>}
            {isAuthenticated ? (
                <Fragment>
                    <button onClick={() => {
                        request.get("logout").then(res => {
                            dispatch(logout);
                            console.log(res);
                        }).catch(e => console.error(e))
                    }}>Logout</button>
                    <Link to="/company">Configurer l'entreprise</Link>
                </Fragment>
            ) : (
                <Fragment>
                    <Link to="/login">Se connecter</Link>
                    <Link to="/register">Ouvrir un compte entreprise</Link>
                </Fragment>
            )}
        </div>
    )
}