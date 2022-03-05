import React from 'react'
import PropTypes from "prop-types"
import TextInput from '../common/TextInput';
import RadioInput from '../common/RadioInput';
import * as roleMapper from "../../utility/RoleMapper"

const AccountForm = ({account, onFirstChange, onLastChange, onSave, onRoleChange, onUsernameChange, onPasswordChange, saving = false, errors = {}}) => {
    const roles = roleMapper.getRoles(account.roles)
    const enableUserAndPass = !roles.isPrep && !roles.isCadet
    return (
        <form onSubmit={onSave}>
            <h2>{account.id ? "Edit" : "Add"} Account</h2>
            {errors.onSave && (
                <div className="alert alert-danger" role="alert">
                    {errors.onSave}
                </div>
            )}
            <RadioInput
                name="role"
                label="Role"
                value={account.groupRole}
                options={roleMapper.roleGroups}
                onChange={onRoleChange}
                error={errors.role}
            />
            <TextInput
                name="first"
                label="First Name"
                value={account.first}
                onChange={onFirstChange}
                error={errors.first}
            />
            <TextInput
                name="last"
                label="Last Name"
                value={account.last}
                onChange={onLastChange}
                error={errors.last}
            />
            {enableUserAndPass && <TextInput
                name="username"
                label="Username"
                value={account.username}
                onChange={onUsernameChange}
                error={errors.username}
            />}
            {enableUserAndPass && <TextInput
                name="password"
                label="Password"
                value={account.password}
                onChange={onPasswordChange}
                error={errors.password}
                secureTextEntry={true}
            />}
            <button type="submit" disabled={saving} className="btn btn-primary">
                {saving ? "Saving..." : "Save"}
            </button>
        </form>
    );
}

AccountForm.propTypes = {
    account: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onRoleChange: PropTypes.func.isRequired,
    onUsernameChange: PropTypes.func.isRequired,
    onFirstChange: PropTypes.func.isRequired,
    onLastChange: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default AccountForm