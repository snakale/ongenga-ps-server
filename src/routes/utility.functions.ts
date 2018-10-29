
import { UserRoles } from "../entities/enums/roles.enum";

export function isLoggedInAdmin(req): boolean {
    return req.session && req.session.userId && req.session.role === UserRoles.admin;
}

export function isLoggedIn(req): boolean {
    return req.session && req.session.userId
}

export function loggedInUserIDMatch(req): boolean {
    return req.session && req.session.userId === parseInt(req.params.id);
}