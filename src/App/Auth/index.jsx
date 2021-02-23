import React, {useState, useCallback, useMemo, useEffect} from 'react'
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

import S from './auth.module.scss'

const hardCoded = {
    login: 'admin',
    password: 'admin'
}

const Auth = ({setIsAuth}) => {
    const [auth, setAuth] = useState([{type: 'login', value: '', error: false}, {type: 'password', value: '', error: false}])
    const isSubmitDisabled = useMemo(() => auth.some(authField => !authField.value), [auth])

    const updateField = useCallback((field, val) => setAuth(prev => (prev.map(authEl =>
        authEl.type === field ?
            {...authEl, ...val}
            :
            authEl)))
        , [setAuth])

    const isFieldCorrect = useCallback((field) => {
        const { value } = auth.find(el => el.type === field)
        const isCorrect = hardCoded[field] === value
        updateField(field, {error: !isCorrect})

        return isCorrect
    }, [auth])

    const onSubmit = useCallback(() => {
        setIsAuth(auth
            .map((authField) => isFieldCorrect(authField.type))
            .every(Boolean)
        )
    }, [auth])

    useEffect(() => {
        const [login, password] = auth

        if((!login.value && login.error) || (!password.value && password.error)) {
            auth.forEach(authEl => !authEl.value && updateField(authEl.type, {error: false}))
        }
    }, [auth])

    return <div className={S.wrapper}>
        <h2>Authorize to proceed</h2>
        {auth.map(authField => {
            const {type, value, error} = authField

            return <FormControl key={type} className={S.formController} error={error} required>
                <InputLabel htmlFor={type}>{type}</InputLabel>
                <Input
                    id={type}
                    type={type}
                    value={value}
                    onChange={(e) => updateField(type, {value: e.target.value, error: false})}
                />
                {error && <FormHelperText>{`Incorrect ${type}`}</FormHelperText>}
            </FormControl>
        })}
        <Button variant="contained" color="primary" disabled={isSubmitDisabled} onClick={onSubmit}>Submit</Button>
    </div>
}

export default Auth