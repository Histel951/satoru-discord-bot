export default ({ next, store }) => {
  if (store.state.loggedIn) {
    return next({
      name: 'Home',
    })
  }

  return next()
}
