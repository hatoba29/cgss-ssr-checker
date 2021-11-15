import React, { FormEvent, SyntheticEvent, useState } from "react"
import { IoIosArrowUp } from "react-icons/io"
import { Option } from "types/option"
import styles from "css/search.module.scss"

interface SearchProps {
  option: Option
  setOption: React.Dispatch<React.SetStateAction<Option>>
}

function Search(props: SearchProps) {
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
  function update(e: FormEvent<HTMLInputElement>) {
    const target = e.currentTarget

    // 리듀서 적용해볼 수 있나?
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
            defaultChecked={props.option.showName}
          />
          <label
            className={styles.checked}
            htmlFor="showName"
            onClick={toggleChecked}
          >
            Show Card Name
          </label>
          <input
            id="awaken"
            type="checkbox"
            onInput={update}
            defaultChecked={props.option.awaken}
          />
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
