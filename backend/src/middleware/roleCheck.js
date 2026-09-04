// Usage: roleCheck('owner', 'admin') restricts a route to owners and admins.
function roleCheck(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'You do not have permission to do that.' });
        }
        next();
    };
}

export default roleCheck;
