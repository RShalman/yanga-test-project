import React, {useState} from 'react'
import { ThemeProvider } from "@material-ui/styles";
import {
    CssBaseline,
    createMuiTheme
} from "@material-ui/core";

import Records from "./Records";
import Auth from "./Auth";
import S from './app.module.scss';


const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

const App = () => {
    const [isAuth, setIsAuth] = useState(false)

    return <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className={S.wrapper}>
            {isAuth ? <Records /> : <Auth setIsAuth={setIsAuth}/>}
        </div>
    </ThemeProvider>
}

export default App;
