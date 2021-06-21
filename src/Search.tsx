import React, { FormEvent, useState } from "react"
import { IoIosArrowUp } from "react-icons/io"
import { Option } from "types/option"
import "css/search.scss"

interface SearchProps {
  option: Option
  setOption: React.Dispatch<React.SetStateAction<Option>>
}

function Search(props: SearchProps) {
  let [isOpen, setOpen] = useState("")

  function showSearch() {
    if (isOpen == "" || isOpen == "close") {
      setOpen("open")
    } else {
      setOpen("close")
    }
  }

  function update(e: FormEvent<HTMLInputElement>) {
    const target = e.currentTarget
    let changed: boolean | string

    if (target.className == "type" || target.className == "limited") {
      props.setOption({
        ...props.option,
        [target.className]: {
          ...props.option[target.className],
          [target.id]: target.checked,
        },
      })
    } else if (target.type == "checkbox") {
      props.setOption({ ...props.option, [target.id]: target.checked })
    } else {
      props.setOption({ ...props.option, [target.id]: target.value })
    }
  }

  return (
    <div id="search" className={isOpen}>
      <div id="opener" onClick={showSearch}>
        <IoIosArrowUp id="arrow" className={isOpen} size="24px" />
      </div>
      <div id="options">
        <div className="option-item">
          Type
          <input
            type="checkbox"
            id="cute"
            className="type"
            defaultChecked={true}
            onInput={update}
          />
          <label htmlFor="cute">Cute</label>
          <input
            type="checkbox"
            id="cool"
            className="type"
            defaultChecked={true}
            onInput={update}
          />
          <label htmlFor="cool">Cool</label>
          <input
            type="checkbox"
            id="passion"
            className="type"
            defaultChecked={true}
            onInput={update}
          />
          <label htmlFor="passion">Passion</label>
        </div>
        <div className="option-item">
          Gacha
          <input
            type="checkbox"
            id="none"
            className="limited"
            defaultChecked={true}
            onInput={update}
          />
          <label htmlFor="none">none</label>
          <input
            type="checkbox"
            id="monthly"
            className="limited"
            defaultChecked={true}
            onInput={update}
          />
          <label htmlFor="monthly">monthly</label>
          <input
            type="checkbox"
            id="blanc"
            className="limited"
            defaultChecked={true}
            onInput={update}
          />
          <label htmlFor="blanc">blanc</label>
          <input
            type="checkbox"
            id="noir"
            className="limited"
            defaultChecked={true}
            onInput={update}
          />
          <label htmlFor="noir">noir</label>
        </div>
        <div className="option-item">
          Card Name: <input id="cardName" onInput={update} />
        </div>
        <div className="option-item">
          Idol Name: <input id="idolName" onInput={update} />
        </div>
        <div className="option-item">
          Show Card Name&nbsp;
          <input
            id="showName"
            type="checkbox"
            onInput={update}
            defaultChecked={props.option.showName}
          />
        </div>
        <div className="option-item">
          Awaken&nbsp;
          <input
            id="awaken"
            type="checkbox"
            onInput={update}
            defaultChecked={props.option.awaken}
          />
        </div>
      </div>
    </div>
  )
}

export default Search
