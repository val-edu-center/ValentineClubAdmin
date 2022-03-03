import React from 'react'
import PropTypes from "prop-types"
import TextInput from '../common/TextInput';

const AccountForm = ({account, onSave, onUsernameChange, saving = false, errors = {}}) => {
    return (
        <form onSubmit={onSave}>
            <h2>{account.id ? "Edit" : "Add"} Account</h2>
            {errors.onSave && (
                <div className="alert alert-danger" role="alert">
                    {errors.onSave}
                </div>
            )}
            <TextInput
                name="username"
                label="Username"
                value={account.username}
                onChange={onUsernameChange}
                error={errors.username}
            />
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
    onUsernameChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default AccountForm