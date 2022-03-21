import { Provider } from "react-redux"
import { store } from "redux-store/store"
import Content from "components/Content"
import Search from "components/Search"

const Main = () => {
  return (
    <Provider store={store}>
      <Content />
      <Search />
    </Provider>
  )
}

export default Main
