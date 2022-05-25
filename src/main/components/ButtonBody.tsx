import { MouseEvent } from "react"

interface Props {
  handleSaveNote: (e: MouseEvent) => void,
  control_textarea: { focus: boolean, disable: boolean }
}

export const ButtonBody = ({ handleSaveNote, control_textarea }: Props) => {
  return (

    <div className="button_editables" id="button_editables" onClick={handleSaveNote}>
      <p></p>
      <button data-name='guardar' disabled={control_textarea.disable} >guardar</button>
      <button data-name='editar' disabled={control_textarea.disable} >editar</button>
      {/* <button>eliminar</button> */}
      {/* <button>add code</button> */}
      {/* <button>add note</button> */}
    </div>
  )
}
