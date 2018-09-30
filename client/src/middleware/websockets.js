import ActionCable from 'actioncable'

const websocketsMiddleware = (store) => {
  const cable = ActionCable.createConsumer("ws://localhost:31000/cable")

  cable.subscriptions.create("LiveChannel", {
    "received": (action) => {
      store.dispatch(action)
    }
  })

  return next => action => {
    return next(action)
  }
}

export default websocketsMiddleware;
