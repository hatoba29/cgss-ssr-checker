import React, { FormEvent, SyntheticEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { IoIosArrowUp } from "react-icons/io"
import styles from "css/search.module.scss"
import {
  updateText,
  updateType,
  updateLimited,
  updateBool,
} from "./redux/search"

function Search() {
  // toggle search overlay
  let [isOpen, setOpen] = useState("")
  function showSearch() {
    if (isOpen == "" || isOpen == styles.close) {
      setOpen(styles.open)
    } else {
      setOpen(styles.close)
    }
  }

  // update option
  const dispatch = useDispatch()
  function update(e: FormEvent<HTMLInputElement>) {
    const target = e.currentTarget

    if (target.type == "text") {
      dispatch(updateText(target))
    } else if (target.className == "type") {
      dispatch(updateType(target))
    } else if (target.className == "limited") {
      dispatch(updateLimited(target))
    } else {
      dispatch(updateBool(target))
    }
  }

  // toggle checked status
  function toggleChecked(e: SyntheticEvent) {
    const target = e.currentTarget
    target.classList.toggle(styles.checked)
  }

  return (
    <div id={styles.search} className={isOpen}>
      <div id={styles.opener} onClick={showSearch}>
        <IoIosArrowUp id={styles.arrow} className={isOpen} size="24px" />
      </div>

      <div id={styles.options}>
        <div className={styles.option_item}>
          <div className={styles.option_name}>Type</div>
          <input
            type="checkbox"
            id="cute"
            className="type"
            defaultChecked={true}
            onInput={update}
          />
          <label
            className={`${styles.cute} ${styles.checked}`}
            htmlFor="cute"
            onClick={toggleChecked}
          >
            Cute
          </label>
          <input
            type="checkbox"
            id="cool"
            className="type"
            defaultChecked={true}
            onInput={update}
          />
          <label
            className={`${styles.cool} ${styles.checked}`}
            htmlFor="cool"
            onClick={toggleChecked}
          >
            Cool
          </label>
          <input
            type="checkbox"
            id="passion"
            className="type"
            defaultChecked={true}
            onInput={update}
          />
          <label
            className={`${styles.passion} ${styles.checked}`}
            htmlFor="passion"
            onClick={toggleChecked}
          >
            Passion
          </label>
        </div>

        <div className={styles.option_item}>
          <div className={styles.option_name}>Gacha</div>
          <input
            type="checkbox"
            id="none"
            className="limited"
            defaultChecked={true}
            onInput={update}
          />
          <label
            className={styles.checked}
            htmlFor="none"
            onClick={toggleChecked}
          >
            Normal
          </label>
          <input
            type="checkbox"
            id="monthly"
            className="limited"
            defaultChecked={true}
            onInput={update}
          />
          <label
            className={styles.checked}
            htmlFor="monthly"
            onClick={toggleChecked}
          >
            Monthly
          </label>
          <input
            type="checkbox"
            id="blanc"
            className="limited"
            defaultChecked={true}
            onInput={update}
          />
          <label
            className={styles.checked}
            htmlFor="blanc"
            onClick={toggleChecked}
          >
            Blanc Fes.
          </label>
          <input
            type="checkbox"
            id="noir"
            className="limited"
            defaultChecked={true}
            onInput={update}
          />
          <label
            className={styles.checked}
            htmlFor="noir"
            onClick={toggleChecked}
          >
            Noir Fes.
          </label>
        </div>

        <div className={styles.option_item}>
          <div className={styles.option_name}>Card Name </div>
          <input type="text" id="cardName" onInput={update} />
        </div>

        <div className={styles.option_item}>
          <div className={styles.option_name}>Idol Name </div>
          <input type="text" id="idolName" onInput={update} />
        </div>

        <div className={styles.option_item}>
          <div className={styles.option_name}>Display Option</div>
          <input
            id="showName"
            type="checkbox"
            onInput={update}
            defaultChecked
          />
          <label
            className={styles.checked}
            htmlFor="showName"
            onClick={toggleChecked}
          >
            Show Card Name
          </label>
          <input id="awaken" type="checkbox" onInput={update} defaultChecked />
          <label
            className={styles.checked}
            htmlFor="awaken"
            onClick={toggleChecked}
          >
            Awaken
          </label>
        </div>
      </div>
    </div>
  )
}

export default Search
