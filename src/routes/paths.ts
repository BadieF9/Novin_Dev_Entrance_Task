function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}
function apiPath(sublink: string): string {
  return `/api${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  users: {
    root: path(ROOTS_DASHBOARD, "/users"),
    create: path(ROOTS_DASHBOARD, "/users/create"),
    edit: (userId: number) => path(ROOTS_DASHBOARD, `/users/${userId}/edit`),
  }
}

export const PATH_AUTH = {
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
};

export const PATH_API = {
  auth: {
    login: apiPath("/auth/login"),
    register: apiPath("/auth/register"),
  },
};
