import React from "react";

export default function AuthForm(props) {
    //destructure
    const {
        handleChange,
        handleSubmit,
        btnText,
        errMssg,
        inputs: {
            username,
            password
        }
    } = props

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <input
                type="text"
                value={username}
                name="username"
                onChange={handleChange}
                placeholder="Username"
            />
            <input
                type="text"
                value={password}
                name="password"
                onChange={handleChange}
                placeholder="Password"
            />

            <button>{btnText}</button>
            <p className="errMssg">{errMssg}</p>
        </form>
    )
}