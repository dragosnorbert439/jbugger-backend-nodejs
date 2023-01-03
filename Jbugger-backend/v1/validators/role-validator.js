const { ErrorCodeError, ErrorCode } = require('../custom-errors/error-code-error');
const { Role } = require('../models/role');

/**
 * Validates the title and the longTitle of a Role
 * @param role{Role} Role model
 */
const validateRoleModel = (role) => {
    if (!role.title.length || typeof role.title !== "string")
        throw new ErrorCodeError('Title should be a given string.',
            ErrorCode.INVALID_ROLE_TITLE);
    if (!role.longTitle.length || typeof role.longTitle !== "string")
        throw new ErrorCodeError('Title should be a given string.',
            ErrorCode.INVALID_ROLE_TITLE);
}