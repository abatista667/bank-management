
export const makeNavigableRouteWithParams = (route: string, params: Record<string, string>) => {
    let newroute = route
    Object.keys(params).forEach(key => newroute = newroute.replace(`:${key}`, params[key]))

    return newroute;
}