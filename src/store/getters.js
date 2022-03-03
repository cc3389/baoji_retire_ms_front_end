const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  auth: state => state.user.auth,
  name: state => state.user.name,
  permission_routes: state => state.user.routes
}
export default getters
