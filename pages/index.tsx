import { Provider } from "react-redux"
import configureStore from "components/redux/configureStore"
import Content from "components/Content"
import Search from "components/Search"

function Main() {
  const store = configureStore()

  return (
    <Provider store={store}>
      <div id="root">
        <Content />
        <Search />
      </div>
    </Provider>
  )
}

export default Main
